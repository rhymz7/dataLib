/**
 * TableView.js
 * Gestion du tableau
 * 
 */

 class TableView {

    constructor( data, tableid ) {
        this.tableid = tableid;
        this.json = data;
        this.table = null;
        this.getTable();

    }

    getTable () {
            var self = this;
            var colonnes = new Array();
            jQuery('#example thead th').each( function( i, elt ){
                var colonne = jQuery( elt ).data('source');
                colonnes.push( {
                    data: colonne
                });
            });
            self.table = jQuery(this.tableid).DataTable( {
                rowId: '__id',
                destroy: true,
                columns: colonnes
                });
    }

    dataview_add( id ) {
        var self = this;
        var data = new Array();
        jQuery('#example thead th').each( function( i, elt ){
            var source = jQuery( elt ).data('source');
            data.push(
                data[source] = self.json[id][source],
            );
        });
        // Ne pas ajouter 2 fois la même ligne
        if ( this.table.row('#'+ id ).length !== 0) {
            return;
        } else {
             this.table.row.add( 
                data
                ).draw();
            }
    }

    dataview_remove( id ) {
        this.table
        .row( '#' + id )
        .remove()
        .draw();
    }

    dataview_removeAll() {
            this.table
            .rows()
            .remove()
            .draw();
    }

 }