document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initModal();
    initCategoryFilter();
});

function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            const isOpen = navLinks.classList.contains('open');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

function initModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');

    window.openModal = function(element, imageSrc, title) {
        if (!modal || !modalImg || !modalTitle) return;

        if (imageSrc) {
            modalImg.src = imageSrc;
            modalImg.alt = title || '';
            modalImg.style.display = 'block';
        } else {
            modalImg.src = '';
            modalImg.style.display = 'none';
        }
        modalTitle.textContent = title || '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function initCategoryFilter() {
    const tabs = document.querySelectorAll('.category-tabs .tab');
    const products = document.querySelectorAll('.product-card');

    if (tabs.length === 0 || products.length === 0) return;

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            tabs.forEach(function(t) {
                t.classList.remove('active');
            });
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            products.forEach(function(product) {
                if (category === 'all') {
                    product.style.display = 'block';
                } else {
                    const productCategory = product.getAttribute('data-category');
                    if (productCategory === category) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                }
            });
        });
    });
}
