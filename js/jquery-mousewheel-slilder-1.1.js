(function( $ ) {
    
    $.fn.mwslider = function( options ) {
        
        var $mwslider = $(this);
        
        // default settings 
        var settings = $.extend({
            'startFrom': 0,
            'bottomMargin': 5
        }, options);
        
        // lets check the placeholder width
        var placehw = this.parent().width();
        
        // also we need a window height
        var windh = $(window).height();
        
        // Current is StarFrom 
        setCurrent(settings.startFrom);
                
        // Current Element Index
        var current = this.children('.current').index();
        
        // Total Elements (lenght)
        var total = this.children().length;
                
        // main context        
        return this.children().each(function($this){
        
            var $this = $(this);
            
            // each image must be as placeholder width
            $this.find('img').width(placehw);
            
            // each image height as a window height
            $this.find('img').height(windh-settings.bottomMargin);
            
            // on MouseWheel Scroll Event
            $this.bind('mousewheel',function(event , delta){
                
                if (delta<0) {
                    
                    if (current<total-1) {
                        
                        ++current;
                                                                                                          
                        $mwslider.children('.current').slideUp();
                                                
                        if (current>=total) --current;
                       
                        // set current
                        setCurrent(current);
                   } 
                                        
                } else {
                                            
                    --current;
                    
                    if (current<0) ++current;
                    
                    // set current
                    setCurrent(current); 
                    
                    $mwslider.children('.current').slideDown();      
                }
                
            });
            
        });
        
        // function set current
        function setCurrent(c){
            
            // Remove Old Current
            $mwslider.children('.current').removeClass('current');
            
            // First Item is Current
            $mwslider.children().filter(':eq('+c+')').addClass('current');
            
        }
        
    };
    
})(jQuery);
