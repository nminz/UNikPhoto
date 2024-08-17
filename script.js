document.addEventListener('DOMContentLoaded', () => {
    const rows = Array.from(document.querySelectorAll('.row'));
    let currentRowIndex = -1; // Index of the currently clicked row
    let currentRowImages = []; // Array to hold images from the current row
    let currentImageIndex = -1; // Index of the currently displayed image
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const span = document.getElementsByClassName('close')[0];
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        document.querySelectorAll('.image').forEach(image => {
            const speed = 0.15; // Adjust this value to control the parallax speed
            image.style.transform = `translateY(${scrollTop * speed}px)`;
        });
    });

    // Function to populate the images in the current row
    function populateCurrentRowImages() {
        currentRowImages = Array.from(rows[currentRowIndex].querySelectorAll('.image'));
        currentImageIndex = 0; // Reset to the first image in the current row
        if (currentRowImages.length > 0) {
            showModal(currentRowImages[currentImageIndex].src, currentRowImages[currentImageIndex].alt, currentImageIndex);
        }
    }

    // Function to show the modal with a specific image
    function showModal(imageSrc, imageAlt, index) {
        modal.style.display = 'flex'; // Show the modal using Flexbox
        modalImg.src = imageSrc; // Set the modal image to the selected image's src
        captionText.innerHTML = imageAlt; // Set the caption (optional)
        currentImageIndex = index; // Update the index of the currently displayed image
    }

    // Function to show the next image (or row)
    function showNextImage() {
        if (currentRowIndex < rows.length - 1) {
            const nextRow = rows[currentRowIndex + 1];
            const nextRowImages = Array.from(nextRow.querySelectorAll('.image'));
            if (nextRowImages.length > 0) {
                currentRowIndex++;
                currentRowImages = nextRowImages;
                showModal(currentRowImages[0].src, currentRowImages[0].alt, 0); // Show the first image in the next row
            }
        }
    }

    // Function to show the previous image (or row)
    function showPrevImage() {
        if (currentRowIndex > 0) {
            const prevRow = rows[currentRowIndex - 1];
            const prevRowImages = Array.from(prevRow.querySelectorAll('.image'));
            if (prevRowImages.length > 0) {
                currentRowIndex--;
                currentRowImages = prevRowImages;
                showModal(currentRowImages[0].src, currentRowImages[0].alt, 0); // Show the first image in the previous row
            }
        }
    }

    // Modal functionality
    rows.forEach((row, index) => {
        row.addEventListener('click', function() {
            console.log('Row clicked:', this); // Debug: log when a row is clicked
            currentRowIndex = index; // Update the index of the currently clicked row
            populateCurrentRowImages(); // Populate images from the clicked row
        });
    });

    // Close the modal when the close button is clicked
    span.onclick = function() {
        console.log('Close button clicked'); // Debug: log when the close button is clicked
        modal.style.display = 'none';
    };

    // Close the modal when clicking outside of the modal content
    window.onclick = function(event) {
        if (event.target === modal) {
            console.log('Modal background clicked'); // Debug: log when the modal background is clicked
            modal.style.display = 'none';
        }
    };

    // Add event listeners for next and previous buttons
    nextBtn.onclick = showNextImage;
    prevBtn.onclick = showPrevImage;
});

    // Make sure modal is hidden initially
    modal.style.display = 'none';
