(function($) {
  "use strict";
		$(document).ready(function(){
 
    	
    // 09. Sidebar Js
	// When clicked or focused, add the class
	$(".it-menu-bar").on("click", function () {
	    $(".itoffcanvas").addClass("opened");
	    $(".body-overlay").addClass("apply");
	});

	$(".close-btn").on("click", function () {
		$(".itoffcanvas").removeClass("opened");
		$(".body-overlay").removeClass("apply");
	});
	$(".body-overlay").on("click focus", function () {
		$(".itoffcanvas").removeClass("opened");
		$(".body-overlay").removeClass("apply");
	});


if ($('.it-menu-content').length && $('.it-menu-mobile').length) {
    let navContent = document.querySelector(".it-menu-content").outerHTML;
    let mobileNavContainer = document.querySelector(".it-menu-mobile");
    mobileNavContainer.innerHTML = navContent;

    let arrow = $(".it-menu-mobile .menu-item-has-children > a");

    arrow.each(function () {
        let self = $(this);
        let arrowBtn = document.createElement("BUTTON");
        arrowBtn.classList.add("dropdown-toggle-btn");
        arrowBtn.innerHTML = "<i class='dashicons dashicons-arrow-right-alt2'></i>";
        self.append(arrowBtn);
    });

    // Use event delegation to handle clicks on dynamically added buttons
    $(document).on("click", ".it-menu-mobile .dropdown-toggle-btn", function (e) {
        e.preventDefault();
        let self = $(this);
        let parentLi = self.closest(".menu-item-has-children");
        let submenu = parentLi.find("> .sub-menu");

        // Check if submenu is open
        let isExpanded = parentLi.hasClass("expanded");

        // Close all siblings' submenus (but not the clicked one)
        parentLi.siblings(".menu-item-has-children").each(function () {
            $(this).removeClass("expanded").find("> .sub-menu").stop(true, true).slideUp(300);
        });

        // Toggle the current submenu based on its current state
        if (isExpanded) {
            parentLi.removeClass("expanded");
            submenu.stop(true, true).slideUp(300);
        } else {
            parentLi.addClass("expanded");
            submenu.stop(true, true).slideDown(300);
        }
    });
}






// The End

	});
		
})(jQuery); 