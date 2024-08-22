import warnings
from pyproj import Proj, transform
from fastkml import kml
# Ignorar la advertencia específica
warnings.filterwarnings("ignore", category=FutureWarning)

def extraer_decenas(cadena):
    # Convertir la cadena a entero y luego a cadena nuevamente para eliminar cualquier caracter no numérico
    cadena_numerica = ''.join(filter(str.isdigit, cadena))
    
    # Verificar si la cadena numérica tiene al menos dos caracteres
    if len(cadena_numerica) >= 2:
        # Extraer las unidades
        decenas = cadena_numerica[-1]
        return int(decenas)
    else:
        return None

def convertir_a_utm(latitud, longitud):
  # Definir el sistema de coordenadas de origen (geográficas)
  p1 = Proj(init='epsg:4326')  # WGS84 (latitud, longitud)

  # Definir el sistema de coordenadas de destino (UTM)
  p2 = Proj(init='epsg:32618')  # UTM zona 18N

  # Convertir las coordenadas
  este, norte = transform(p1, p2, longitud, latitud)

  return este, norte

def convertir_a_geo(utm_zone, utm_band,x,y):
  # Definir sistema de coordenadas de destino (geográficas)
  in_proj = Proj(proj='utm', zone=utm_zone, ellps='WGS84', south=(utm_band==True))
  out_proj = Proj(proj='latlong', datum='WGS84')

  # Convertir coordenadas UTM a geográficas
  lon, lat = transform(in_proj, out_proj, x, y)

  return lon, lat

def extract_coordinates(kml_file):
  coordinates_array=[]   
  with open(kml_file, 'rb') as f:
    doc = f.read()
    k = kml.KML()
    k.from_string(doc)

    # Iterar sobre todos los elementos de Placemark
    for feature in k.features():
      if isinstance(feature, kml.Document):
        for placemark in feature.features():
          if isinstance(placemark, kml.Placemark):
            # Obtener las coordenadas de cada Placemark
            coords = placemark.geometry.coords
            for coord in coords:
              coordinates_array.append(coord)
  return coordinates_array

# Especifica la ruta del f KML
kml_file = r"D:\Users\User(D)\Escritorio\ric\entrada.kml"

# Llama a la función para extraer coordenadas
utm_zone = 18  # por ejemplo, UTM Zone 10 en Norteamérica
utm_band = 'S'

coordinates_array=extract_coordinates(kml_file)
d=0
d_falta=0
coordenadas_finales=[]
for i in range(len(coordinates_array)):
  if i>0:
    lon_1,lat_1,_=coordinates_array[i-1]
    lon_2,lat_2,_=coordinates_array[i]
    este_1, norte_1 = convertir_a_utm(lat_1,lon_1)
    este_2, norte_2 = convertir_a_utm(lat_2,lon_2)
    d=d_falta+((este_2-este_1)**2+(norte_2-norte_1)**2)**0.5
    dE=(este_2-este_1)
    dN=(norte_2-norte_1)
    cantidades=int(d/100)
    for n in range(cantidades):
      if n!=0:
        este=este+(dE/d)*(100)
        norte=norte+(dN/d)*(100)
      else:
        este=este_1+(dE/d)*(100-d_falta)
        norte=norte_1+(dN/d)*(100-d_falta)
      
      coord_final=convertir_a_geo(utm_zone, utm_band,este,norte)
      coordenadas_finales.append(coord_final)
    d_falta=d-100*cantidades

#Abrir en modo lectura
with open("salida.kml","w") as f:
  #Escribir cabecera del documento
  f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
  f.write('<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">\n')
  f.write('<Document>\n')
  f.write('''  <StyleMap id="msn_triangle0">
		<Pair>
			<key>normal</key>
			<styleUrl>#sn_triangle</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#sh_triangle0</styleUrl>
		</Pair>
	 </StyleMap>
   <Style id="sn_triangle">
		<IconStyle>
			<color>ff0000ff</color>
			<scale>1.2</scale>
			<Icon>
				<href>http://maps.google.com/mapfiles/kml/shapes/triangle.png</href>
			</Icon>
		</IconStyle>
		<LabelStyle>
			<color>ff0000ff</color>
			<scale>1.3</scale>
		</LabelStyle>
		<BalloonStyle>
		</BalloonStyle>
		<ListStyle>
		</ListStyle>
	 </Style>
   <Style id="sh_triangle0">
		<IconStyle>
			<color>ff0000ff</color>
			<scale>1.4</scale>
			<Icon>
				<href>http://maps.google.com/mapfiles/kml/shapes/triangle.png</href>
			</Icon>
		</IconStyle>
		<LabelStyle>
			<color>ff0000ff</color>
			<scale>1.3</scale>
		</LabelStyle>
		<BalloonStyle>
		</BalloonStyle>
		<ListStyle>
		</ListStyle>
	 </Style>
          <StyleMap id="msn_open-diamond">
		<Pair>
			<key>normal</key>
			<styleUrl>#sn_open-diamond</styleUrl>
		</Pair>
		<Pair>
			<key>highlight</key>
			<styleUrl>#sh_open-diamond</styleUrl>
		</Pair>
	</StyleMap>
	<Style id="sh_open-diamond">
		<IconStyle>
			<color>000000ff</color>
			<scale>1.16667</scale>
			<Icon>
				<href>http://maps.google.com/mapfiles/kml/shapes/open-diamond.png</href>
			</Icon>
		</IconStyle>
		<LabelStyle>
			<color>ff0000ff</color>
		</LabelStyle>
		<BalloonStyle>
		</BalloonStyle>
		<ListStyle>
		</ListStyle>
	</Style>
	<Style id="sn_open-diamond">
		<IconStyle>
			<color>000000ff</color>
			<Icon>
				<href>http://maps.google.com/mapfiles/kml/shapes/open-diamond.png</href>
			</Icon>
		</IconStyle>
		<LabelStyle>
			<color>ffffaaaa</color>
		</LabelStyle>
		<BalloonStyle>
		</BalloonStyle>
		<ListStyle>
		</ListStyle>
	</Style>\n''')

  #Escribir datos del documento
  i=1
  f.write('''  <Folder>
    <name>postes</name>\n''')
  for coordenadas in coordenadas_finales:
    lon,lat = coordenadas
    if (100*i) % 1000==0:
      f.write('    <Placemark>\n')
      f.write('      <name>'+ str((100*i)/1000)+str(000)+'</name>\n')
      f.write('''      <styleUrl>#msn_triangle0</styleUrl>
      <Point>\n''')
      f.write('        <coordinates>' + str(lon) + ',' + str(lat) + '      </coordinates>\n')
      f.write('      </Point>\n')
      f.write('    </Placemark>\n')
    i+=1
  f.write('  </Folder>\n')

  i=1
  f.write('''  <Folder>
	  <name>rotulado</name>\n''')
  for coordenadas in coordenadas_finales:
    lon,lat = coordenadas
    if (100*i) % 1000!=0: 
      f.write('   <Placemark>\n')
      if i>=11:
        i=extraer_decenas(str(i))
        f.write('     <name>'+ str(100*i)+'</name>\n')
      else:
         f.write('     <name>'+ str(100*i)+'</name>\n')

      f.write('''      <styleUrl>#msn_open-diamond</styleUrl>
      <Point>\n''')
      f.write('        <coordinates>' + str(lon) + ',' + str(lat) + '</coordinates>\n')
      f.write('     </Point>\n')
      f.write('   </Placemark>\n')
    i+=1

  f.write('  </Folder>\n')

  f.write('</Document>\n')
  #Cerrar el documento
  f.write('</kml>\n')
