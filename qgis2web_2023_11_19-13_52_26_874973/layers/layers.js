var wms_layers = [];

var format_LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0 = new ol.format.GeoJSON();
var features_LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0 = format_LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0.readFeatures(json_LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0.addFeatures(features_LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0);
var lyr_LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0, 
                style: style_LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0,
                interactive: true,
                title: '<img src="styles/legend/LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0.png" /> LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206'
            });
var format_KM_KM2_1 = new ol.format.GeoJSON();
var features_KM_KM2_1 = format_KM_KM2_1.readFeatures(json_KM_KM2_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_KM_KM2_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_KM_KM2_1.addFeatures(features_KM_KM2_1);
var lyr_KM_KM2_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_KM_KM2_1, 
                style: style_KM_KM2_1,
                interactive: true,
    title: 'KM_KM2<br />\
    <img src="styles/legend/KM_KM2_1_0.png" /> 1 - 1<br />\
    <img src="styles/legend/KM_KM2_1_1.png" /> 1 - 2<br />\
    <img src="styles/legend/KM_KM2_1_2.png" /> 2 - 3<br />'
        });

lyr_LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0.setVisible(true);lyr_KM_KM2_1.setVisible(true);
var layersList = [lyr_LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0,lyr_KM_KM2_1];
lyr_LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0.set('fieldAliases', {'CCDD': 'CCDD', 'NOMBDEP': 'NOMBDEP', 'CCPP': 'CCPP', 'NOMBPROV': 'NOMBPROV', 'CCDI': 'CCDI', 'NOMBDIST': 'NOMBDIST', 'CAPITAL': 'CAPITAL', 'UBIGEO': 'UBIGEO', 'IDPROV': 'IDPROV', 'CODIGO': 'CODIGO', 'CNT_CCPP': 'CNT_CCPP', 'DESCRIPCIO': 'DESCRIPCIO', 'N_MEF': 'N_MEF', 'COD_MEF': 'COD_MEF', 'PROV_MEF': 'PROV_MEF', 'ENT_MEF': 'ENT_MEF', 'AREA_KM2': 'AREA_KM2', });
lyr_KM_KM2_1.set('fieldAliases', {'DISTRITOS': 'DISTRITOS', 'DAÑO_CARR': 'DAÑO_CARR', 'DAÑO/RED_': 'DAÑO/RED_', 'GASTO_TOTA': 'GASTO_TOTA', 'PERCAPITA': 'PERCAPITA', 'KM/KM2': 'KM/KM2', 'x': 'x', 'y': 'y', });
lyr_LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0.set('fieldImages', {'CCDD': 'TextEdit', 'NOMBDEP': 'TextEdit', 'CCPP': 'TextEdit', 'NOMBPROV': 'TextEdit', 'CCDI': 'TextEdit', 'NOMBDIST': 'TextEdit', 'CAPITAL': 'TextEdit', 'UBIGEO': 'TextEdit', 'IDPROV': 'TextEdit', 'CODIGO': 'TextEdit', 'CNT_CCPP': 'TextEdit', 'DESCRIPCIO': 'TextEdit', 'N_MEF': 'TextEdit', 'COD_MEF': 'TextEdit', 'PROV_MEF': 'TextEdit', 'ENT_MEF': 'TextEdit', 'AREA_KM2': 'TextEdit', });
lyr_KM_KM2_1.set('fieldImages', {'DISTRITOS': 'TextEdit', 'DAÑO_CARR': 'TextEdit', 'DAÑO/RED_': 'TextEdit', 'GASTO_TOTA': 'TextEdit', 'PERCAPITA': 'TextEdit', 'KM/KM2': 'TextEdit', 'x': 'TextEdit', 'y': 'TextEdit', });
lyr_LIMITE_DISTRITAL_2020_INEI_geogpsperu_juansuyo_931381206_0.set('fieldLabels', {'CCDD': 'no label', 'NOMBDEP': 'no label', 'CCPP': 'no label', 'NOMBPROV': 'no label', 'CCDI': 'no label', 'NOMBDIST': 'no label', 'CAPITAL': 'no label', 'UBIGEO': 'no label', 'IDPROV': 'no label', 'CODIGO': 'no label', 'CNT_CCPP': 'no label', 'DESCRIPCIO': 'no label', 'N_MEF': 'no label', 'COD_MEF': 'no label', 'PROV_MEF': 'no label', 'ENT_MEF': 'no label', 'AREA_KM2': 'no label', });
lyr_KM_KM2_1.set('fieldLabels', {'DISTRITOS': 'no label', 'DAÑO_CARR': 'no label', 'DAÑO/RED_': 'no label', 'GASTO_TOTA': 'no label', 'PERCAPITA': 'no label', 'KM/KM2': 'no label', 'x': 'no label', 'y': 'no label', });
lyr_KM_KM2_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});