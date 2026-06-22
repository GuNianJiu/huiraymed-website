document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initModal();
    initCategoryFilter();
    initSearch();
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
            const searchQuery = document.getElementById('searchInput')?.value.toLowerCase() || '';

            products.forEach(function(product) {
                const productCategory = product.getAttribute('data-category');
                const productName = product.querySelector('h3')?.textContent.toLowerCase() || '';
                const productModel = product.querySelector('.spec-value')?.textContent.toLowerCase() || '';
                const matchCategory = category === 'all' || productCategory === category;
                const matchSearch = searchQuery === '' || productName.includes(searchQuery) || productModel.includes(searchQuery);
                
                product.style.display = (matchCategory && matchSearch) ? 'block' : 'none';
            });
        });
    });
}

function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const products = document.querySelectorAll('.product-card');
    const tabs = document.querySelectorAll('.category-tabs .tab');
    
    console.log('搜索函数执行中...');
    console.log('searchInput:', searchInput);
    console.log('products数量:', products.length);
    console.log('tabs数量:', tabs.length);
    
    if (!searchInput || products.length === 0) {
        console.log('缺少必要元素');
        return;
    }
    
    const searchQuery = searchInput.value.toLowerCase();
    console.log('搜索关键词:', searchQuery);
    
    const activeTab = document.querySelector('.category-tabs .tab.active');
    const category = activeTab?.getAttribute('data-category') || 'all';
    console.log('当前分类:', category);
    
    let visibleCount = 0;
    products.forEach(function(product) {
        const productName = product.querySelector('h3')?.textContent.toLowerCase() || '';
        const productModel = product.querySelector('.spec-value')?.textContent.toLowerCase() || '';
        const productCategory = product.getAttribute('data-category');
        
        const matchCategory = category === 'all' || productCategory === category;
        const matchSearch = searchQuery === '' || productName.includes(searchQuery) || productModel.includes(searchQuery);
        
        product.style.display = (matchCategory && matchSearch) ? 'block' : 'none';
        if (matchCategory && matchSearch) visibleCount++;
    });
    
    console.log('显示的产品数量:', visibleCount);
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', searchProducts);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', searchProducts);
    }
}
