
var listener;
var dataview;

jQuery.getJSON('/Artefacts/wp-content/plugins/TestPlugin/data/data.json', function( data )
{
    console.log('test');
    console.log(data);
    var filter = new Filter( data, ['#checkbox1'] );
    listener = new Listener( '#listener' );
    var tableview = new TableView( data, '#example' );
    var map = new MapView( data, 'mapid' );
    dataview = new DataView( data, filter, [tableview, map, listener] );
});
