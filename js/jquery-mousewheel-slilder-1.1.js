/*
 * jQuery Mousewheel Slider Plugin 1.1.0
 * Composed by Bawyka T.P.
 * Author web-site: https://github.com/Bawyka
 * Plugin Repository: https://github.com/Bawyka/jQuery-Mousewheel-Slider
 * 
 * Copyright (c) Bawyka T.P. (https://github/Bawyka), 2013.
 * Dual-licensed under the BSD (BSD-LICENSE.txt) and GPL (GPL-LICENSE.txt)
 * licenses.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.    See the
 * GNU General Public License for more details.
 */
 (function( $ ) {
       
    $.fn.mwslider = function( options ) {
        
        var $mwslider = $(this);
        
        // default settings 
        var settings = $.extend({
            'startFrom': 0,
            'speed': 'slow',
            'easing': 'swing',
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
        
        // On Arrow Click Event
        this.parent().find('.arrow').on('click',function(){ 
        
             if ($(this).attr("id")=="Down") {
                
                if (current<total-1) {
                    
                    ++current;
                    
                    $mwslider.children('.current').slideUp(settings.speed, settings.easing);
                    
                    if (current>=total) --current;
                           
                    // set current
                    setCurrent(current);
                    
                }
                
             } else {
                
                --current;
                    
                if (current<0) ++current;
                
                // set current
                setCurrent(current); 
                
                $mwslider.children('.current').slideDown(settings.speed, settings.easing);
                
             }
            
        });
                        
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
                                                                                                          
                        $mwslider.children('.current').slideUp(settings.speed, settings.easing);
                                                
                        if (current>=total) --current;
                       
                        // set current
                        setCurrent(current);
                   } 
                                        
                } else {
                                            
                    --current;
                    
                    if (current<0) ++current;
                    
                    // set current
                    setCurrent(current); 
                    
                    $mwslider.children('.current').slideDown(settings.speed, settings.easing);      
                }
                
            });
                        
        });
                        
        // function set current
        function setCurrent(c){
            
            // Remove Old Current
            $mwslider.children('.current').removeClass('current');
            
            // First Item is Current
            $mwslider.children().filter(':eq('+c+')').addClass('current');
            
            // Slide Title
            $('#slideTitle').text($mwslider.children('.current').find('img').attr('alt'));
                                    
        }
                        
    };
    
})(jQuery);
