/**
 * DataView.js
 * Controller principal qui gère le filtre, la map, la table
 */

class DataView {

    constructor( data, filter, arrayClasses ) {
        this.data = data;
        this.arrayClasses = arrayClasses;
        this.filter = filter;
    }

    checkAllBox() {
        var self = this;
        var elts = document.querySelectorAll('.choix');
        var items = this.data[jQuery('#id-checkbox0').data('source0')];
        elts.forEach(function( elt ) {
            elt.checked = elt.checked = true;
        });
        items.forEach(function( item ){
            self.arrayClasses.forEach(function(elt) {
                elt.dataview_add( item.__id )
            });
        });
    }

    removeAllBox() {
        var elts = document.querySelectorAll('.choix');
        elts.forEach(function( elt ) {
             elt.checked = elt.checked = false;
        });
        this.arrayClasses.forEach(function( elt ) {
            elt.dataview_removeAll()
        });
    }

    selected( id ){
        //path est constitué du niv1, puis niv2 pour accéder aux filtres
        var path = id.split("_");
        var arrayIds = this.filter.filters[path[0]].values[path[1]].ids;
        var self = this;
        if (jQuery('#'+ id).is(':checked') == true) {
                arrayIds.forEach(function( idItem ){
                    self.arrayClasses.forEach(function( elt ) {
                        elt.dataview_add( idItem )
                });
            });
        }
        if (jQuery('#'+ id).is(':checked') == false) {
            arrayIds.forEach(function( idItem ){
                self.arrayClasses.forEach(function( elt ) {
                    elt.dataview_remove( idItem )
                });
            });
        }
    }

    hide( cible ){
        var a = document.getElementById( cible );
        if ( a.style.display === 'block' ) {
            a.style.display = 'none';
        } else {
            a.style.display = 'block';
        }
    }
    
}