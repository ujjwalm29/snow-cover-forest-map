/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var dataset = ee.Image("DLR/WSF/WSF2015/v1");
/***** End of imports. If edited, may not auto-convert in the playground. *****/


Map.addLayer(wsf, {min: 0, max: 1}, "WSF 2015")

print('Hello world!');