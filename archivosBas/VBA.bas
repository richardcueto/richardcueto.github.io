'VBA
'definimos las variables range
'Dim ImpCa As range

Dim BD As Range
Dim Conce As Range
Dim Tram_Lon As Range
Dim Peaje As Range
Dim Obra As Range
Dim situacion As Range
Dim depart As Range
Dim Hoja6 As Worksheet
Dim FilaFinal As Integer

Sub richi()
'***********************************************
'*****************Excel*************************
'***********************************************
On Error Resume Next
'definimos variables worksheet
Dim hoja1 As Worksheet
Dim Hoja2 As Worksheet
Dim Hoja3 As Worksheet
Dim Hoja4 As Worksheet
Dim Hoja5 As Worksheet

'definimos other variables
Dim concesion As String
Dim fila As Integer
'enviamos Worksheet a variable hoja
Set hoja1 = Worksheets("IMP_REPRT_CARR.")
Set Hoja2 = Worksheets("CONCESIONARIA")
Set Hoja3 = Worksheets("BD_GENERAL_CARRETERAS")
Set Hoja4 = Worksheets("TRAMOS_LONGITUD")
Set Hoja5 = Worksheets("PEAJE")
Set Hoja6 = Worksheets("OBRAS")
'################################
'valor a buscar y matriz de datos
 concesion = hoja1.Range("B1").Value 'Colocamos el rango de datos
'#########BD_GENERAL_CARRETERAS
'pegamos BD en ImpCa
With hoja1.Range("A2") 'Colocamos el rango de datos
    .Value = "BD_GENERAL_CARRETERAS"
    .Font.Bold = True
End With
Hoja3.Range("B:B").AutoFilter Field:=1, Criteria1:=concesion
Hoja3.Range("B1:W17").SpecialCells(xlCellTypeVisible).Copy _
Destination:=hoja1.Range("A3") 'Colocamos el rango de datos
Hoja3.AutoFilterMode = False
Set BD = hoja1.Range("A4:P4")

'#########CONCESIONARIA
'pegamos CONCESIONARIA en ImpCa
fila = hoja1.Cells(Rows.Count, 1).End(xlUp).Row
With hoja1.Range("A" & (fila + 1))
    .Value = "CONCESIONARIA"
    .Font.Bold = True
End With
Hoja2.Range("B:B").AutoFilter Field:=1, Criteria1:=concesion
Hoja2.Range("C2:D93").SpecialCells(xlCellTypeVisible).Copy _
Destination:=hoja1.Range("A" & (fila + 2))
Hoja2.AutoFilterMode = False

Dim FilaAnte As Integer
FilaAnte = fila
'#########TRAMOS LONGITUD
'pegamos TRAMOS LONGITUD en ImpCa
fila = hoja1.Cells(Rows.Count, 1).End(xlUp).Row
Dim FilaPost As Integer
FilaPost = fila
Set Conce = hoja1.Range("A" & (FilaAnte + 2), "B" & FilaPost)

With hoja1.Range("A" & (fila + 1))
    .Value = "TRAMOS LONGITUD"
    .Font.Bold = True
End With
Hoja4.Range("B:B").AutoFilter Field:=1, Criteria1:=concesion
Hoja4.Range("C2:H112").SpecialCells(xlCellTypeVisible).Copy _
Destination:=hoja1.Range("A" & (fila + 2))
Hoja4.AutoFilterMode = False

FilaAnte = fila
'#########PEAJE
'pegamos PEAJE en ImpCa
fila = hoja1.Cells(Rows.Count, 1).End(xlUp).Row
FilaPost = fila
Set Tram_Lon = hoja1.Range("A" & (FilaAnte + 2), "F" & FilaPost)

With hoja1.Range("A" & (fila + 1))
    .Value = "PEAJE"
    .Font.Bold = True
End With
Hoja5.Range("B:B").AutoFilter Field:=1, Criteria1:=concesion
Hoja5.Range("C2:P111").SpecialCells(xlCellTypeVisible).Copy _
Destination:=hoja1.Range("A" & (fila + 2))
Hoja5.AutoFilterMode = False

FilaAnte = fila
'#########OBRA
'pegamos OBRAS en ImpCa
fila = hoja1.Cells(Rows.Count, 1).End(xlUp).Row
FilaPost = fila
Set Peaje = hoja1.Range("A" & (FilaAnte + 2), "N" & FilaPost)

With hoja1.Range("A" & (fila + 1))
    .Value = "OBRAS"
    .Font.Bold = True
End With
Hoja6.Range("B:B").AutoFilter Field:=1, Criteria1:=concesion
Hoja6.Range("B1:M16").SpecialCells(xlCellTypeVisible).Copy _
     Destination:=hoja1.Range("A" & (fila + 2))
Hoja6.AutoFilterMode = False
FilaAnte = FilaPost

FilaFinal = hoja1.Cells(Rows.Count, 1).End(xlUp).Row
hoja1.Range("A" & (fila + 2) & ":" & "Q100").WrapText = False
Set Obra = hoja1.Range("A" & (FilaAnte + 3), "N" & FilaFinal)
dict
End Sub
```

```vb
Sub dict()
On Error Resume Next
Dim Hoja7 As Worksheet
Dim celdaInicio As Range
Dim dep
Dim sit
Dim celda
Dim clave
Dim ValorActual
Dim fila
Set Hoja7 = Worksheets("Hoja54")
Set celdaInicio = Hoja7.Range("C1")
Dim dict
Set dict = CreateObject("Scripting.Dictionary")
dep = Obra.Columns(2) 'departamento
sit = Obra.Columns(3) 'situacion
For Each celda In dep
    Debug.Print celda
    ValorActual = celda
    If Not dict.Exits(ValorActual) Then
        dict.Add ValorActual, Nothing
    End If
Next celda
fila = 1
For Each clave In dict.keys
    Hoja7.Cells(fila, 3).Value = clave
    fila = fila + 1
Next
dict.RemoveAll
For Each celda In sit
    Debug.Print celda
    ValorActual = celda
    If Not dict.Exits(ValorActual) Then
        dict.Add ValorActual, Nothing
    End If
Next celda
fila = 1
For Each clave In dict.keys
    Hoja7.Cells(fila, 4).Value = clave
    fila = fila + 1
Next
Set depart = Hoja7.Range("C1:C" & Hoja7.Cells(Rows.Count, 3).End(xlUp).Row)
Set situacion = Hoja7.Range("D1:D" & Hoja7.Cells(Rows.Count, 4).End(xlUp).Row)

End Sub
```

```vb
Sub borro()
With hoja1.Range("A2:Z100")
    .Clear
End With
With Hoja7.Range("C:Z")
    .Clear
    End With
End Sub