// hamburger menu
function onClickMenu() {
			document.getElementById("menu").classList.toggle("icon");
			document.getElementById("nav-hamburger").classList.toggle("change");
		}


// product wrapper
		const carousel = document.querySelector(".wrapper-carousel");
    const firstImg = carousel.querySelectorAll("img")[0];
    const arrowIcons = document.querySelectorAll(".wrapper i");

    let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

    const showHideIcons = () => {
      // Show or hide the left button based on whether there's space to scroll on the right
      arrowIcons[0].classList.toggle("hidden", carousel.scrollLeft === 0);

      // Show or hide the right button based on whether there's space to scroll on the left
      let scrollWidth = firstImg.clientWidth * carousel.children.length - carousel.clientWidth;
      arrowIcons[1].classList.toggle("hidden", carousel.scrollLeft === scrollWidth);
    };

    arrowIcons.forEach(icon => {
      icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        let scrollValue = icon.classList.contains("fa-angle-left") ? -firstImgWidth : firstImgWidth;
        let scrollWidth = firstImg.clientWidth * carousel.children.length - carousel.clientWidth; // getting max scrollable width
        let newScrollLeft = carousel.scrollLeft + scrollValue;

        if (icon.classList.contains("fa-angle-left") && newScrollLeft < 0) {
          // If attempting to scroll left and there's no space, set the scroll to the max value
          carousel.scrollLeft = 0;
        } else if (icon.classList.contains("fa-angle-right") && newScrollLeft > scrollWidth) {
          // If attempting to scroll right and there's no space, set the scroll to the max value
          carousel.scrollLeft = scrollWidth;
        } else {
          // Otherwise, perform the scroll
          carousel.style.scrollBehavior = "smooth"; // Add smooth scrolling behavior
          carousel.scrollLeft += scrollValue;
          setTimeout(() => {
            carousel.style.scrollBehavior = "auto"; // Reset the scroll behavior
            showHideIcons();
          }, 400); // Set the delay to match the CSS transition duration
        }
      });
    });

    const autoSlide = () => {
      // ... (existing code)
    };

    const mouseDragStart = (e) => {
      isDragStart = true;
      prevPageX = e.pageX;
      prevScrollLeft = carousel.scrollLeft;
    };

    const touchDragStart = (e) => {
      isDragStart = true;
      prevPageX = e.touches[0].pageX;
      prevScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
      if (!isDragStart) return;
      e.preventDefault();
      isDragging = true;
      carousel.classList.add("dragging");
      positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
      carousel.scrollLeft = prevScrollLeft - positionDiff;
      showHideIcons();
    };

    const dragStop = () => {
      isDragStart = false;
      carousel.classList.remove("dragging");

      if (!isDragging) return;
      isDragging = false;
      autoSlide();
    };

    carousel.addEventListener("mousedown", mouseDragStart);
    carousel.addEventListener("touchstart", touchDragStart);

    document.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging);

    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("touchend", dragStop);

    // Initial call to show/hide icons
    showHideIcons();

