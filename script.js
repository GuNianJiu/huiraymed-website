document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initModal();
    initCategoryFilter();
    initSearch();
    initContactForm();
    initToastContainer();
});

function initToastContainer() {
    if (!document.querySelector('.toast-container')) {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
}

function showToast(message, type, duration) {
    const container = document.querySelector('.toast-container');
    if (!container) {
        initToastContainer();
        return showToast(message, type, duration);
    }

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type || 'info'}`;
    toast.innerHTML = `<span>${icons[type || 'info'] || 'ℹ️'}</span><span>${message}</span>`;
    container.appendChild(toast);

    const dur = duration || 3500;
    setTimeout(function() {
        toast.classList.add('leaving');
        setTimeout(function() {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
    }, dur);
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const formTip = document.getElementById('formTip');

    if (!form) return;

    if (formTip) {
        form.addEventListener('mouseenter', function() {
            formTip.style.display = 'block';
        });
        form.addEventListener('mouseleave', function() {
            formTip.style.display = 'none';
        });
    }

    form.addEventListener('submit', function(e) {
        const name = form.querySelector('input[name="name"]')?.value.trim() || '';
        const phone = form.querySelector('input[name="phone"]')?.value.trim() || '';
        const message = form.querySelector('textarea[name="message"]')?.value.trim() || '';

        if (!name || !phone || !message) {
            e.preventDefault();
            showToast('请填写必填项：姓名、电话、留言内容', 'error');
            return;
        }

        if (phone.length < 7) {
            e.preventDefault();
            showToast('请输入正确的联系电话', 'error');
            return;
        }

        showToast('留言信息已准备好！请在弹出的邮件中点击"发送"完成提交', 'success', 5000);
        showToast('或直接拨打电话：18000780071 联系我们', 'info', 6000);

        setTimeout(function() {
            form.reset();
        }, 800);
    });
}

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

function filterProducts() {
    const searchInput = document.getElementById('searchInput');
    const products = document.querySelectorAll('.product-card');
    const activeTab = document.querySelector('.category-tabs .tab.active');

    if (products.length === 0) return;

    const searchQuery = searchInput?.value.toLowerCase() || '';
    const category = activeTab?.getAttribute('data-category') || 'all';

    products.forEach(function(product) {
        const productCategory = product.getAttribute('data-category');
        const productName = product.querySelector('h3')?.textContent.toLowerCase() || '';
        const allSpecValues = product.querySelectorAll('.spec-value');
        let productSpecText = '';
        allSpecValues.forEach(function(spec) {
            productSpecText += spec.textContent.toLowerCase() + ' ';
        });
        const productDesc = product.querySelector('.description')?.textContent.toLowerCase() || '';
        const productSubtitle = product.querySelector('.subtitle')?.textContent.toLowerCase() || '';

        const matchCategory = category === 'all' || productCategory === category;
        const matchSearch = searchQuery === '' 
            || productName.includes(searchQuery) 
            || productSpecText.includes(searchQuery)
            || productDesc.includes(searchQuery)
            || productSubtitle.includes(searchQuery);
        
        if (matchCategory && matchSearch) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
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
            filterProducts();
        });
    });
}

function searchProducts() {
    filterProducts();
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') searchProducts();
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', searchProducts);
    }
}
