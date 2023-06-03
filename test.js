/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var dataset2 = ee.Image("DLR/WSF/WSF2015/v1"),
    modis = ee.ImageCollection("MODIS/061/MOD11A1"),
    dataset = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
/***** End of imports. If edited, may not auto-convert in the playground. *****/

var usa = dataset.filter(ee.Filter.eq('country_co', 'US'));


var start = ee.Date('2015-01-01');
var dateRange = ee.DateRange(start, start.advance(1, 'year'));

var mod11a2 = modis.filterDate(dateRange);

var modLSTday = mod11a2.select('LST_Day_1km');



var modLSTinC = modLSTday.map(function(img) {
  return img
    .multiply(0.02)
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
});



print(usa);

Map.centerObject(usa, 6);
Map.addLayer(usa);

// var ts1 = ui.Chart.image.series({
//   imageCollection: modLSTc,
//   region: india,
//   reducer: ee.Reducer.mean(),
//   scale: 1000,
//   xProperty: 'system:time_start'})
//   .setOptions({
//     title: 'LST 2015 Time Series',
//     vAxis: {title: 'LST Celsius'}});
// print(ts1);



var clippedLSTc = modLSTinC.mean().clip(usa);

Map.addLayer(clippedLSTc, {
  min: -5, max: 30,
  palette: ['blue', 'limegreen', 'yellow', 'darkorange', 'red']},
  'Mean temperature, 2015');


