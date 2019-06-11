/**
 * Listener.js
 * Debugger
 */

class Listener {
    constructor( id ){
        this.id = id;
    }

    dataview_add( idadd ) {
        var div = jQuery(this.id);
        div.html( div.html() + "id ajouté : " + idadd + ", ");
    }

    dataview_remove( idremove ) {
        var div = jQuery(this.id);
        div.html( div.html() + "id supprimé : " + idremove + ", ");
    }

    dataview_removeAll() {
        var div = jQuery(this.id);
        div.html( div.html() + "Tout a été supprimé, ");
    }

    clear(){
        var div = jQuery(this.id);
        div.html("");
    }

}