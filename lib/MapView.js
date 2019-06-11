/**
 * 
 * MapView.js
 */

 class MapView {

    constructor( data, mapid, map_popup_template_id ) {
        this.mapid = mapid;
        this.init();
        this.data = data;
        this.mymap;
        this.markers;
        this.IdToMarkerId = [];
        this.fitBounds();
        this.map_popup_template_id = map_popup_template_id;
    }

    init() {
        var mymap = L.map(this.mapid);
        this.mymap = mymap;
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
          maxZoom: 18,
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox.streets'
        }).addTo(mymap);
        this.markers = new L.MarkerClusterGroup().addTo(this.mymap);
    }

    fitBounds()
	{
		var bounds = this.markers.getBounds();
		if( bounds.isValid() )
		{
			this.mymap.fitBounds( bounds );
		}
		else
			this.mymap.setView([47.365, 0.633], 8);
	}

    dataview_add( id ) {
        var self = this;
        var latlon = this.data[id].latlon;
        // Do not add SIAE twice
		if( this.IdToMarkerId[ id ] != null )
        return ;

        if( latlon == null )
        {
            console.log('ERROR, item has no coord:');
            return ;
        }
        var marker = L.marker( latlon );
        var p = jQuery(this.map_popup_template_id);
        // jQuery('[data-source="name"]', p).text(this.data[id].name);
        // jQuery('[data-source="marque"]', p).text(this.data[id].marque);

        jQuery(this.map_popup_template_id).children().each(function( i, elt2 ){
            var test = jQuery( elt2 ).data('source');
            var split1 = test.split(",");
            split1.forEach(function( elt ) {
                if(elt.length > 1) {
                    var split2 = elt.split("=");
                    var source = split2[0];
                    var target = split2[1];
                } else {
                    var source = split[0];
                    var target = null;
                }
                if( !target || target == null ) {
                    jQuery(elt2).text(self.data[id][source]);
                } else {
                    // TODO
                    jQuery(elt2).attr(target, self.data[id][source]);
                }
            });
        });
    
    
        marker.bindPopup( p.html() ).openPopup();
        //marker.bindPopup("<b>Hello world!</b><br>"+ this.data.voitures[id].name).openPopup();
        this.markers.addLayer( marker );
        this.IdToMarkerId[ id ] = marker._leaflet_id;
    }

    dataview_remove( id ) { 
            var itemId = this.IdToMarkerId[ id ];
            if( itemId == null )
			    return;
            var marker = this.markers.getLayer( itemId );
            this.markers.removeLayer( marker );
            this.IdToMarkerId[ id ] = null ;
    }

    dataview_removeAll()
	{
		this.markers.clearLayers();
		this.IdToMarkerId = [];
	}
 }