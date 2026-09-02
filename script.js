document.addEventListener('DOMContentLoaded', function() {
    initI18n();
    initMobileNav();
    initModal();
    initCategoryFilter();
    initSearch();
    initContactForm();
    initChatWidget();
    initToastContainer();
    initQualificationViewer();
    initProductDetailModal();
    initInquiryPrefill();
});

/* ========= 多语言切换 (i18n) ========= */
const I18N_DICT = {
    zh: {
        'nav.home': '首页', 'nav.products': '产品简介', 'nav.about': '关于我们', 'nav.contact': '联系我们',
        'nav.toggle': '切换导航菜单', 'lang.switch': 'EN',
        'hero.title': '汇睿生物 · 专业眼科医疗器械', 'hero.slogan': '点亮视界 · 触手可及',
        'hero.subtitle': '深圳前海汇睿生物技术有限公司（HuiRayMed）专注于眼科医疗器械研发、生产和销售，<br>为眼科医疗机构提供高品质的眼科耗材、手术器械及诊断设备整体解决方案。',
        'hero.cta.browse': '浏览产品目录', 'hero.cta.quote': '获取样品报价',
        'trust.iso.label': '质量体系认证', 'trust.nmpa.title': 'NMPA 注册', 'trust.nmpa.label': '产品合规上市',
        'trust.hospital.title': '10+ 三甲医院', 'trust.hospital.label': '临床选用',
        'trust.warranty.title': '2年 质保', 'trust.warranty.label': '全程售后保障',
        'about.title': '关于我们', 'about.subtitle': '专注眼科医疗 守护清晰视界',
        'about.p1': '<strong>深圳前海汇睿生物技术有限公司</strong>（品牌名：HuiRayMed）成立于深圳前海，是一家专注于眼科医疗器械研发、生产和销售的创新型企业。',
        'about.p2': '公司秉承"点亮视界，触手可及"的企业使命，致力于通过前沿科技为眼科医疗机构和患者提供高品质的眼科耗材及诊断设备解决方案。',
        'about.p3': '公司总部位于深圳市坪山区生物医药创新产业园，拥有先进的研发实验室和符合GMP标准的眼科医疗器械生产车间。',
        'about.h1': '眼科研发项目', 'about.h2': '医疗器械质量管理体系', 'about.h3': '客户满意度',
        'why.title': '为什么选择我们', 'why.subtitle': '专注专业，值得信赖',
        'why.c1.t': '专业团队', 'why.c1.d': '由医疗器械行业资深专家领衔，研发团队拥有多年技术积累和临床实践经验。',
        'why.c2.t': '质量保障', 'why.c2.d': '严格遵循ISO13485质量管理体系，从研发到生产全流程管控。',
        'why.c3.t': '客户至上', 'why.c3.d': '从售前咨询到售后支持，提供全周期的专业服务。',
        'why.c4.t': '持续创新', 'why.c4.d': '保持对前沿技术的敏锐洞察，持续投入研发。',
        'qual.title': '资质证书', 'qual.subtitle': '全流程合规认证 · 品质保障',
        'qual.tip': '点击查看高清扫描件', 'qual.status': '✅ 有效', 'qual.preview': '查看证书 ↗',
        'qual.c1.ph': '营业执照', 'qual.c1.t': '企业营业执照', 'qual.c1.no': '统一社会信用代码：91440300342737280L',
        'qual.c2.ph': '生产许可证', 'qual.c2.t': '医疗器械生产许可证', 'qual.c2.no': '生产类别：Ⅱ类16眼科器械',
        'qual.c3.ph': '产品注册证', 'qual.c3.t': '产品注册证（泪液检测酚红棉线）', 'qual.c3.no': 'NMPA 国家药监局批准上市',
        'cm.title': '资质证书预览', 'cm.noimg': '暂无高清扫描件', 'cm.contact': '请联系我们获取完整电子版资质文件', 'cm.phone': '📞 180-0078-0071 周经理',
        'contact.title': '联系我们', 'contact.subtitle': '期待与您的合作', 'contact.info': '联系方式',
        'contact.person.val': '周源辉', 'contact.production.lbl': '生产负责人',
        'contact.company.lbl': '公司电话', 'contact.sales.lbl': '销售团队',
        'contact.person2.name': '周浩', 'contact.person2.pos': '区域销售经理',
        'contact.person3.name': '稽君甫', 'contact.person3.pos': '区域销售经理', 'chat.close': '关闭',
        'contact.addr.lbl': '地址',
        'contact.addr.val': '深圳市坪山区坑梓街道金沙社区金辉路14号<br>深圳市生物医药创新产业园区11号楼11层',
        'contact.form.title': '在线留言',
        'contact.form.name': '您的姓名', 'contact.form.phone': '联系电话', 'contact.form.email': '电子邮箱', 'contact.form.company': '公司名称', 'contact.form.msg': '留言内容',
        'contact.form.submit': '提交留言', 'contact.form.tip': '💡 提交后请在邮件客户端中点击"发送"完成留言',
        'contact.map.link': '📍 点击查看地图', 'contact.map.addr': '深圳市坪山区坑梓街道金沙社区金辉路14号<br>生物医药创新产业园区',
        'footer.desc': '专业眼科医疗器械研发、生产与销售', 'footer.contact': '电话：18000780071 | 邮箱：1787360775@qq.com',
        'footer.p.t': '产品中心', 'footer.p.diag': '眼科诊断设备', 'footer.p.surg': '眼科手术器械', 'footer.p.cons': '眼科耗材', 'footer.p.reag': '眼科诊断试剂',
        'footer.a.t': '关于我们', 'footer.a.comp': '公司简介', 'footer.a.adv': '核心优势', 'footer.a.cont': '联系我们',
        'footer.s.t': '服务支持', 'footer.s.after': '售后服务', 'footer.s.tech': '技术支持', 'footer.s.purch': '采购咨询',
        'footer.copy': '© 2025 深圳前海汇睿生物技术有限公司 版权所有 | 专注眼科医疗 守护清晰视界',
        'footer.addr': '地址：深圳市坪山区坑梓街道金沙社区金辉路14号生物医药创新产业园区11号楼11层',
        'cat.all': '全部产品', 'cat.cons': '眼科耗材', 'cat.surg': '手术器械',
        'search.ph': '搜索产品名称、型号...',
        'card.zoom': '点击查看详情', 'card.specs': '产品规格', 'card.model': '型号', 'card.pkg1': '单包装', 'card.pkg2': '盒包装', 'card.life': '有效期',
        'card.inquiry': '了解详情 →', 'back.home': '← 返回首页',
        'spec.1strip': '1条/袋', 'spec.2strip': '2条/袋', 'spec.1set': '1套/袋', 'spec.10pack': '10袋/盒', 'spec.1pack': '1袋/盒', 'spec.2y': '2年', 'spec.3y': '3年',
        'p1.name': '泪液检测酚红棉线', 'p1.desc': '用于检测泪液分泌量的眼科诊断耗材，辅助判断干眼症等眼部疾病。采用酚红指示剂，操作简便，结果准确。',
        'p2.name': '泪液检测滤纸条', 'p2.desc': '用于Schirmer试验的眼科检测耗材，精准测量泪液分泌量。高吸水性滤纸材质，质地柔软，对眼部无刺激。',
        'p3.name': '荧光素钠眼科检测试纸', 'p3.desc': '用于角膜染色检查的眼科诊断耗材，辅助诊断角膜损伤、干眼症等疾病。荧光素钠含量精准，显色清晰。',
        'p4.name': '硬性接触镜验配试纸', 'p4.desc': '用于硬性透气性角膜接触镜（RGP）验配的辅助诊断耗材，帮助评估镜片适配情况，提高验配准确性。',
        'p5.name': '一次性使用负压吸引角膜环钻（供体）', 'p5.desc': '用于角膜移植手术中供体角膜组织的精准切割。采用负压吸附固定，切割边缘整齐，减少组织损伤。',
        'p6.name': '一次性使用负压吸引角膜环钻（受体）', 'p6.desc': '用于角膜移植手术中受体角膜组织的精准切割。采用负压吸附固定，切割边缘整齐，提高手术精确度。',
        'pm.tab.photo': '📷 产品图', 'pm.tab.spec': '📋 技术参数', 'pm.tab.doc': '📁 说明书', 'pm.tab.clinic': '🏥 临床应用',
        'pm.nophoto': '暂无高清实物图<br>点击右下方按钮获取产品资料',
        'pm.sp.model': '产品型号', 'pm.sp.pkg1': '单包装规格', 'pm.sp.pkg2': '盒包装规格', 'pm.sp.life': '有效期',
        'pm.sp.sterile': '灭菌方式', 'pm.sp.sterile.v': '环氧乙烷灭菌（EO）',
        'pm.sp.scope': '适用范围', 'pm.sp.scope.v': '临床眼科检查 / 眼科手术辅助',
        'pm.sp.cert': '注册证号', 'pm.sp.license': '生产许可证号', 'pm.sp.standard': '生产标准', 'pm.sp.standard.v': '符合 GB/T 16886 / YY 0033 医疗器械标准',
        'pm.doc.desc': '本产品全套技术文档包含注册证、技术要求、检验报告、使用说明书等资料，如需完整版文档请联系销售人员。以下为可下载的资料列表：',
        'pm.doc.manual': '产品使用说明书', 'pm.doc.manual.m': 'PDF · 2.4MB · 中文 / English',
        'pm.doc.regcert': '医疗器械注册证', 'pm.doc.regcert.m': 'PDF · 860KB · NMPA批准',
        'pm.doc.lit': '临床文献汇总', 'pm.doc.lit.m': 'PDF · 3.1MB · SCI / 核心期刊研究',
        'pm.clinic1': '临床应用场景一', 'pm.clinic2': '临床应用场景二',
        'pm.stock': '<span class="dot">●</span> 现货供应 · 全国顺丰包邮', 'pm.inquiry': '📞 立即询价此产品',
        'form.err.required': '请填写必填项：姓名、电话、留言内容',
        'form.err.phone': '请输入正确的联系电话',
        'form.ok.prepared': '留言信息已准备好！请在弹出的邮件中点击"发送"完成提交',
        'form.ok.call': '或直接拨打电话：18000780071 联系我们',
        'prefill.ph': '您好，我想咨询产品：【{p}】，请尽快联系我。',
        'prefill.toast': '已为您预选产品：{p}，留言框已自动填入',
        'pm.doc.contact': '请联系销售获取完整资料'
    },
    en: {
        'nav.home': 'Home', 'nav.products': 'Products', 'nav.about': 'About Us', 'nav.contact': 'Contact',
        'nav.toggle': 'Toggle navigation', 'lang.switch': '中文',
        'hero.title': 'HuiRayMed · Professional Ophthalmic Medical Devices', 'hero.slogan': 'Light Up Vision · Within Reach',
        'hero.subtitle': 'Shenzhen Qianhai HuiRay Biotechnology Co., Ltd. (HuiRayMed) specializes in the R&D, manufacturing, and sales of ophthalmic medical devices,<br>providing high-quality ophthalmic consumables, surgical instruments, and diagnostic equipment solutions for eye care institutions.',
        'hero.cta.browse': 'Browse Products', 'hero.cta.quote': 'Get Sample Quote',
        'trust.iso.label': 'Quality System Certification', 'trust.nmpa.title': 'NMPA Registered', 'trust.nmpa.label': 'Compliant Market Entry',
        'trust.hospital.title': '10+ Grade-A Hospitals', 'trust.hospital.label': 'Clinical Adoption',
        'trust.warranty.title': '2-Year Warranty', 'trust.warranty.label': 'Full After-Sales Support',
        'about.title': 'About Us', 'about.subtitle': 'Dedicated to Ophthalmology, Guarding Clear Vision',
        'about.p1': '<strong>Shenzhen Qianhai HuiRay Biotechnology Co., Ltd.</strong> (Brand: HuiRayMed) is founded in Shenzhen Qianhai, an innovative enterprise focused on R&D, manufacturing, and sales of ophthalmic medical devices.',
        'about.p2': 'The company upholds the corporate mission of "Light Up Vision, Within Reach," dedicated to providing high-quality ophthalmic consumables and diagnostic equipment solutions for eye care institutions and patients through cutting-edge technology.',
        'about.p3': 'The company is headquartered in Shenzhen Pingshan District Biomedical Innovation Industrial Park, with advanced R&D laboratories and GMP-standard ophthalmic medical device production workshops.',
        'about.h1': 'R&D Projects', 'about.h2': 'Medical Device QMS', 'about.h3': 'Customer Satisfaction',
        'why.title': 'Why Choose Us', 'why.subtitle': 'Professional Focus, Trusted Partner',
        'why.c1.t': 'Expert Team', 'why.c1.d': 'Led by senior medical device industry experts, the R&D team has years of technical accumulation and clinical practice experience.',
        'why.c2.t': 'Quality Assurance', 'why.c2.d': 'Strictly follows ISO 13485 quality management system, with full-process control from R&D to production.',
        'why.c3.t': 'Customer First', 'why.c3.d': 'From pre-sales consultation to after-sales support, providing full-cycle professional services.',
        'why.c4.t': 'Continuous Innovation', 'why.c4.d': 'Maintains keen insight into cutting-edge technology, with continuous R&D investment.',
        'qual.title': 'Qualifications', 'qual.subtitle': 'Full-Process Compliance Certification · Quality Guaranteed',
        'qual.tip': 'Click to view HD scan', 'qual.status': '✅ Valid', 'qual.preview': 'View Certificate ↗',
        'qual.c1.ph': 'Business License', 'qual.c1.t': 'Business License', 'qual.c1.no': 'Unified Social Credit Code: 91440300342737280L',
        'qual.c2.ph': 'Production License', 'qual.c2.t': 'Medical Device Production License', 'qual.c2.no': 'Category: Class II-16 Ophthalmic Devices',
        'qual.c3.ph': 'Product Registration', 'qual.c3.t': 'Product Registration Certificate (Phenol Red Thread for Lacrimal Detection)', 'qual.c3.no': 'NMPA Approved for Market',
        'cm.title': 'Qualification Certificate Preview', 'cm.noimg': 'No HD scan available', 'cm.contact': 'Please contact us for the full digital qualification documents', 'cm.phone': '📞 180-0078-0071 Mr. Zhou',
        'contact.title': 'Contact Us', 'contact.subtitle': 'Looking Forward to Our Cooperation', 'contact.info': 'Contact Information',
        'contact.person.val': 'Zhou Yuanhui', 'contact.production.lbl': 'Production Manager',
        'contact.company.lbl': 'Company Phone', 'contact.sales.lbl': 'Sales Team',
        'contact.person2.name': 'Zhou Hao', 'contact.person2.pos': 'Regional Sales Manager',
        'contact.person3.name': 'Ji Junfu', 'contact.person3.pos': 'Regional Sales Manager', 'chat.close': 'Close',
        'contact.addr.lbl': 'Address',
        'contact.addr.val': '11th Floor, Building 11, Shenzhen Biomedical Innovation Industrial Park,<br>No. 14 Jinhui Road, Jinsha Community, Kengzi Street, Pingshan District, Shenzhen',
        'contact.form.title': 'Online Message',
        'contact.form.name': 'Your Name', 'contact.form.phone': 'Phone Number', 'contact.form.email': 'Email', 'contact.form.company': 'Company Name', 'contact.form.msg': 'Message',
        'contact.form.submit': 'Submit Message', 'contact.form.tip': '💡 After submitting, please click "Send" in your email client to complete the message',
        'contact.map.link': '📍 Click to view map', 'contact.map.addr': 'No. 14 Jinhui Road, Jinsha Community, Kengzi Street, Pingshan District, Shenzhen<br>Biomedical Innovation Industrial Park',
        'footer.desc': 'Professional Ophthalmic Medical Device R&D, Manufacturing & Sales', 'footer.contact': 'Phone: 18000780071 | Email: 1787360775@qq.com',
        'footer.p.t': 'Products', 'footer.p.diag': 'Diagnostic Devices', 'footer.p.surg': 'Surgical Instruments', 'footer.p.cons': 'Consumables', 'footer.p.reag': 'Diagnostic Reagents',
        'footer.a.t': 'About Us', 'footer.a.comp': 'Company Profile', 'footer.a.adv': 'Core Advantages', 'footer.a.cont': 'Contact Us',
        'footer.s.t': 'Support', 'footer.s.after': 'After-Sales Service', 'footer.s.tech': 'Technical Support', 'footer.s.purch': 'Purchase Consultation',
        'footer.copy': '© 2025 Shenzhen Qianhai HuiRay Biotechnology Co., Ltd. All Rights Reserved | Dedicated to Ophthalmology, Guarding Clear Vision',
        'footer.addr': 'Address: 11th Floor, Building 11, Shenzhen Biomedical Innovation Industrial Park, No. 14 Jinhui Road, Jinsha Community, Kengzi Street, Pingshan District, Shenzhen',
        'cat.all': 'All Products', 'cat.cons': 'Ophthalmic Consumables', 'cat.surg': 'Surgical Instruments',
        'search.ph': 'Search product name, model...',
        'card.zoom': 'Click for details', 'card.specs': 'Product Specs', 'card.model': 'Model', 'card.pkg1': 'Unit Pack', 'card.pkg2': 'Box Pack', 'card.life': 'Shelf Life',
        'card.inquiry': 'Learn More →', 'back.home': '← Back to Home',
        'spec.1strip': '1 strip/pack', 'spec.2strip': '2 strips/pack', 'spec.1set': '1 set/pack', 'spec.10pack': '10 packs/box', 'spec.1pack': '1 pack/box', 'spec.2y': '2 years', 'spec.3y': '3 years',
        'p1.name': 'Phenol Red Thread for Lacrimal Detection', 'p1.desc': 'Ophthalmic diagnostic consumable for detecting tear secretion volume, assisting in the diagnosis of dry eye and other ocular diseases. Uses phenol red indicator, easy to operate, accurate results.',
        'p2.name': 'Schirmer Filter Paper Strip', 'p2.desc': 'Ophthalmic testing consumable for Schirmer\'s test, precisely measuring tear secretion volume. Highly absorbent filter paper material, soft texture, non-irritating to the eye.',
        'p3.name': 'Fluorescein Sodium Ophthalmic Test Strip', 'p3.desc': 'Ophthalmic diagnostic consumable for corneal staining examination, assisting in the diagnosis of corneal abrasions, dry eye, and other diseases. Precise fluorescein sodium content, clear coloration.',
        'p4.name': 'RGP Fitting Test Strip', 'p4.desc': 'Auxiliary diagnostic consumable for rigid gas permeable (RGP) contact lens fitting, helping evaluate lens fitting conditions and improving fitting accuracy.',
        'p5.name': 'Disposable Negative Pressure Corneal Trephine (Donor)', 'p5.desc': 'For precise cutting of donor corneal tissue in corneal transplant surgery. Uses negative pressure suction fixation, clean cutting edges, reduced tissue damage.',
        'p6.name': 'Disposable Negative Pressure Corneal Trephine (Recipient)', 'p6.desc': 'For precise cutting of recipient corneal tissue in corneal transplant surgery. Uses negative pressure suction fixation, clean cutting edges, improved surgical precision.',
        'pm.tab.photo': '📷 Product Image', 'pm.tab.spec': '📋 Specifications', 'pm.tab.doc': '📁 Documents', 'pm.tab.clinic': '🏥 Clinical Applications',
        'pm.nophoto': 'No HD product image available<br>Click the button below to request product materials',
        'pm.sp.model': 'Product Model', 'pm.sp.pkg1': 'Unit Pack Spec', 'pm.sp.pkg2': 'Box Pack Spec', 'pm.sp.life': 'Shelf Life',
        'pm.sp.sterile': 'Sterilization', 'pm.sp.sterile.v': 'Ethylene Oxide (EO) Sterilization',
        'pm.sp.scope': 'Intended Use', 'pm.sp.scope.v': 'Clinical Ophthalmic Examination / Ophthalmic Surgery Assistance',
        'pm.sp.cert': 'Registration No.', 'pm.sp.license': 'Production License No.', 'pm.sp.standard': 'Production Standard', 'pm.sp.standard.v': 'Compliant with GB/T 16886 / YY 0033 Medical Device Standards',
        'pm.doc.desc': 'This product\'s full technical documentation includes registration certificate, technical requirements, inspection reports, user manuals, and more. Please contact sales for the complete documents. Available downloads:',
        'pm.doc.manual': 'Product User Manual', 'pm.doc.manual.m': 'PDF · 2.4MB · Chinese / English',
        'pm.doc.regcert': 'Medical Device Registration Certificate', 'pm.doc.regcert.m': 'PDF · 860KB · NMPA Approved',
        'pm.doc.lit': 'Clinical Literature Summary', 'pm.doc.lit.m': 'PDF · 3.1MB · SCI / Core Journal Studies',
        'pm.clinic1': 'Clinical Application Scenario 1', 'pm.clinic2': 'Clinical Application Scenario 2',
        'pm.stock': '<span class="dot">●</span> In Stock · Free Shipping Nationwide', 'pm.inquiry': '📞 Request Quote',
        'form.err.required': 'Please fill in required fields: name, phone, message',
        'form.err.phone': 'Please enter a valid phone number',
        'form.ok.prepared': 'Message ready! Click "Send" in your email client to submit',
        'form.ok.call': 'Or call 18000780071 to reach us',
        'prefill.ph': 'Hello, I\'d like to inquire about product: [{p}], please contact me.',
        'prefill.toast': 'Product pre-selected: {p}, message box auto-filled',
        'pm.doc.contact': 'Please contact sales for full materials'
    }
};

let currentLang = localStorage.getItem('lang') || 'zh';

function t(key) {
    const dict = I18N_DICT[currentLang] || I18N_DICT.zh;
    return dict[key] || I18N_DICT.zh[key] || key;
}

function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
        el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function(el) {
        const pair = el.getAttribute('data-i18n-attr').split(':');
        if (pair.length === 2) el.setAttribute(pair[0], t(pair[1]));
    });
    const sw = document.getElementById('langSwitch');
    if (sw) sw.textContent = t('lang.switch');
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
}

function initI18n() {
    const sw = document.getElementById('langSwitch');
    if (sw) {
        sw.addEventListener('click', function() {
            applyLang(currentLang === 'zh' ? 'en' : 'zh');
        });
    }
    applyLang(currentLang);
}

/* ========= 通用 Toast ========= */
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

/* ========= 联系表单（已含回填 + Toast） ========= */
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
            showToast(t('form.err.required'), 'error');
            return;
        }

        if (phone.length < 7) {
            e.preventDefault();
            showToast(t('form.err.phone'), 'error');
            return;
        }

        showToast(t('form.ok.prepared'), 'success', 5000);
        showToast(t('form.ok.call'), 'info', 6000);

        setTimeout(function() {
            form.reset();
            try { sessionStorage.removeItem('intendedProduct'); } catch(_) {}
        }, 800);
    });
}

/* ========= 浮动在线留言窗口（可拖拽） ========= */
function initChatWidget() {
    const fab = document.getElementById('chatFab');
    const win = document.getElementById('chatWindow');
    const header = document.getElementById('chatHeader');
    const closeBtn = document.getElementById('chatClose');
    if (!fab || !win) return;

    function clampToViewport() {
        const rect = win.getBoundingClientRect();
        const maxLeft = Math.max(window.innerWidth - rect.width - 8, 8);
        const maxTop = Math.max(window.innerHeight - rect.height - 8, 8);
        const left = Math.min(Math.max(rect.left, 8), maxLeft);
        const top = Math.min(Math.max(rect.top, 8), maxTop);
        win.style.left = left + 'px';
        win.style.top = top + 'px';
        win.style.right = 'auto';
        win.style.bottom = 'auto';
    }

    function openChat() {
        win.classList.add('open');
        fab.classList.add('hidden');
        clampToViewport();
    }

    function closeChat() {
        win.classList.remove('open');
        fab.classList.remove('hidden');
    }

    window.openChatWindow = openChat;
    fab.addEventListener('click', openChat);
    if (closeBtn) closeBtn.addEventListener('click', closeChat);

    document.addEventListener('keydown', function(e) {
        if (e.key !== 'Escape' || !win.classList.contains('open')) return;
        if (document.querySelector('.preview-modal.active, .product-modal.active')) return;
        closeChat();
    });

    window.addEventListener('resize', function() {
        if (win.classList.contains('open')) clampToViewport();
    });

    if (!header) return;

    let dragging = false, moved = false, startX = 0, startY = 0, startLeft = 0, startTop = 0;

    header.addEventListener('pointerdown', function(e) {
        if (e.target.closest('.chat-close')) return;
        dragging = true;
        moved = false;
        startX = e.clientX;
        startY = e.clientY;
        const rect = win.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;
        win.style.left = rect.left + 'px';
        win.style.top = rect.top + 'px';
        win.style.right = 'auto';
        win.style.bottom = 'auto';
        win.classList.add('dragging');
        try { header.setPointerCapture(e.pointerId); } catch(_) {}
    });

    header.addEventListener('pointermove', function(e) {
        if (!dragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (!moved && Math.abs(dx) + Math.abs(dy) < 4) return;
        moved = true;
        const w = win.offsetWidth;
        const h = win.offsetHeight;
        const left = Math.min(Math.max(startLeft + dx, 8), Math.max(window.innerWidth - w - 8, 8));
        const top = Math.min(Math.max(startTop + dy, 8), Math.max(window.innerHeight - h - 8, 8));
        win.style.left = left + 'px';
        win.style.top = top + 'px';
    });

    function endDrag(e) {
        if (!dragging) return;
        dragging = false;
        win.classList.remove('dragging');
        try { header.releasePointerCapture(e.pointerId); } catch(_) {}
    }
    header.addEventListener('pointerup', endDrag);
    header.addEventListener('pointercancel', endDrag);
}

/* ========= 移动端汉堡菜单 ========= */
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

/* ========= 旧图片弹窗（兼容） ========= */
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
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

/* ========= 搜索与分类筛选 ========= */
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

/* ========= A. 资质证书墙预览弹窗 ========= */
function initQualificationViewer() {
    const cards = document.querySelectorAll('#qualGrid .qual-card');
    const modal = document.getElementById('certModal');
    if (cards.length === 0 || !modal) return;

    const closeBtn = document.getElementById('certClose');
    const prevBtn = document.getElementById('certPrev');
    const nextBtn = document.getElementById('certNext');
    const titleEl = document.getElementById('certTitle');
    const imgEl = document.getElementById('certImg');
    const iframeEl = document.getElementById('certIframe');
    const holderEl = document.getElementById('certPlaceholder');
    const counterEl = document.getElementById('certCounter');

    let current = 0;
    const total = cards.length;
    const isPdf = (url) => /\.pdf(\?|#|$)/i.test((url || '').trim());

    function render(idx) {
        current = (idx + total) % total;
        const card = cards[current];
        const name = getCardData(card, 'data-name') || t('qual.title');
        const image = card.getAttribute('data-image') || '';

        titleEl.textContent = name;
        counterEl.textContent = (current + 1) + ' / ' + total;

        const showImg = function() {
            imgEl.src = image;
            imgEl.alt = name;
            imgEl.style.display = 'block';
            if (iframeEl) { iframeEl.src = ''; iframeEl.style.display = 'none'; }
            if (holderEl) holderEl.style.display = 'none';
        };
        const showPdf = function() {
            if (iframeEl) { iframeEl.src = image; iframeEl.style.display = 'block'; }
            imgEl.src = '';
            imgEl.style.display = 'none';
            if (holderEl) holderEl.style.display = 'none';
        };
        const showPlaceholder = function() {
            imgEl.src = '';
            imgEl.style.display = 'none';
            if (iframeEl) { iframeEl.src = ''; iframeEl.style.display = 'none'; }
            if (holderEl) holderEl.style.display = 'block';
        };

        if (image && image.trim()) {
            if (isPdf(image)) {
                showPdf();
            } else {
                showImg();
            }
        } else {
            showPlaceholder();
        }
    }

    function openModal(idx) {
        render(idx);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (iframeEl) {
            setTimeout(function() { iframeEl.src = ''; }, 200);
        }
    }

    cards.forEach(function(card, i) {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(i);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (prevBtn) prevBtn.addEventListener('click', function() { render(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function() { render(current + 1); });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        else if (e.key === 'ArrowLeft') render(current - 1);
        else if (e.key === 'ArrowRight') render(current + 1);
    });

    document.addEventListener('langchange', function() {
        if (modal.classList.contains('active')) {
            render(current);
        }
    });
}

/* ========= B. 产品详情 Tab 弹窗 ========= */
function getCardData(card, attr) {
    var enAttr = attr + '-en';
    var isEn = document.documentElement.lang === 'en';
    if (isEn && card.hasAttribute(enAttr)) {
        return card.getAttribute(enAttr);
    }
    return card.getAttribute(attr);
}

function initProductDetailModal() {
    const openTriggers = document.querySelectorAll('[data-open-product]');
    const modal = document.getElementById('productModal');
    if (!modal && openTriggers.length === 0) return;
    if (!modal) return;

    const cards = Array.from(document.querySelectorAll('.product-card'));
    const closeBtn = document.getElementById('pClose');
    const tabs = modal.querySelectorAll('.p-tab');
    const panels = modal.querySelectorAll('.p-tab-panel');
    const inquiryBtn = document.getElementById('pInquiryBtn');

    const photoEl = document.getElementById('pPhoto');
    const photoImgEl = photoEl ? photoEl.querySelector('img') : null;
    const photoEmojiEl = document.getElementById('pPhotoEmoji');
    const noPhotoEl = document.getElementById('pNoPhoto');

    const nameEl = document.getElementById('pName');
    const subnameEl = document.getElementById('pSubname');
    const spec1 = document.getElementById('pSpec1');
    const spec2 = document.getElementById('pSpec2');
    const spec3 = document.getElementById('pSpec3');
    const spec4 = document.getElementById('pSpec4');
    const spec5 = document.getElementById('pSpec5');
    const spec6 = document.getElementById('pSpec6');

    const c1Lbl = document.getElementById('pClinic1Lbl');
    const c1Desc = document.getElementById('pClinic1Desc');
    const c2Lbl = document.getElementById('pClinic2Lbl');
    const c2Desc = document.getElementById('pClinic2Desc');

    let openedIndex = -1;

    function fillData(index) {
        const card = cards[index];
        if (!card) return;
        openedIndex = index;

        const h3 = card.querySelector('h3');
        const sub = card.querySelector('.subtitle');
        const desc = card.querySelector('.description');

        if (nameEl) nameEl.textContent = h3 ? h3.textContent : '';
        if (subnameEl) subnameEl.textContent = sub ? sub.textContent : '';

        const icon = card.getAttribute('data-icon') || '📦';
        const image = card.getAttribute('data-image') || '';

        if (photoEl) {
            let existingImg = photoEl.querySelector('img');
            if (image) {
                if (!existingImg) {
                    existingImg = document.createElement('img');
                    photoEl.innerHTML = '';
                    photoEl.appendChild(existingImg);
                    if (noPhotoEl) photoEl.appendChild(noPhotoEl);
                }
                existingImg.src = image;
                existingImg.alt = h3 ? h3.textContent : '';
                existingImg.style.display = 'block';
                if (noPhotoEl) noPhotoEl.style.display = 'none';
                photoEl.style.fontSize = 'inherit';
            } else {
                if (existingImg) existingImg.style.display = 'none';
                if (photoEmojiEl) photoEmojiEl.textContent = icon;
                if (noPhotoEl) noPhotoEl.style.display = 'block';
                photoEl.style.fontSize = '';
            }
        }

        if (spec1) spec1.textContent = card.getAttribute('data-model') || '-';
        if (spec2) spec2.textContent = getCardData(card, 'data-pkg1') || '-';
        if (spec3) spec3.textContent = getCardData(card, 'data-pkg2') || '-';
        if (spec4) spec4.textContent = getCardData(card, 'data-life') || '-';
        if (spec5) spec5.textContent = getCardData(card, 'data-cert') || '-';
        if (spec6) spec6.textContent = getCardData(card, 'data-license') || '-';

        if (c1Lbl) c1Lbl.textContent = getCardData(card, 'data-clinic1') || t('pm.clinic1');
        if (c1Desc) c1Desc.textContent = getCardData(card, 'data-clinic1-desc') || '';
        if (c2Lbl) c2Lbl.textContent = getCardData(card, 'data-clinic2') || t('pm.clinic2');
        if (c2Desc) c2Desc.textContent = getCardData(card, 'data-clinic2-desc') || '';

        // 重置默认 Tab
        tabs.forEach(function(t, i) {
            t.classList.toggle('active', i === 0);
        });
        panels.forEach(function(p, i) {
            p.classList.toggle('active', i === 0);
        });

        if (inquiryBtn) {
            inquiryBtn.addEventListener('click', function() {
                try {
                    sessionStorage.setItem('intendedProduct', nameEl.textContent.trim());
                } catch(_) {}
            }, { once: true });
        }
    }

    function openModal(index) {
        fillData(index);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(function() { modal.scrollTop = 0; }, 30);
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openTriggers.forEach(function(el) {
        el.addEventListener('click', function() {
            const idx = parseInt(el.getAttribute('data-open-product'), 10);
            if (!isNaN(idx)) openModal(idx);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            const key = tab.getAttribute('data-tab');
            tabs.forEach(function(t) { t.classList.remove('active'); });
            panels.forEach(function(p) {
                p.classList.toggle('active', p.getAttribute('data-panel') === key);
            });
            tab.classList.add('active');
        });
    });

    // 了解详情按钮也顺便记录产品名（兼容跨页回填）
    document.querySelectorAll('[data-inquiry]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const idx = parseInt(btn.getAttribute('data-inquiry'), 10);
            const card = cards[idx];
            if (card) {
                const h3 = card.querySelector('h3');
                if (h3) {
                    try { sessionStorage.setItem('intendedProduct', h3.textContent.trim()); } catch(_) {}
                }
            }
        });
    });

    document.addEventListener('langchange', function() {
        if (modal.classList.contains('active') && openedIndex >= 0) {
            fillData(openedIndex);
        }
    });
}

/* ========= C. 跨页联系表单产品名回填 ========= */
function initInquiryPrefill() {
    try {
        const productName = sessionStorage.getItem('intendedProduct');
        if (!productName) return;

        const form = document.getElementById('contactForm');
        if (!form) return;

        const msgInput = form.querySelector('textarea[name="message"]');
        if (msgInput) {
            if (!msgInput.value) {
                const ph = t('prefill.ph').replace('{p}', productName);
                msgInput.placeholder = ph;
                msgInput.addEventListener('focus', function prefillOnce() {
                    if (!msgInput.value) {
                        msgInput.value = ph;
                    }
                    msgInput.removeEventListener('focus', prefillOnce);
                }, { once: true });
            }
        }

        // 进入页面时提示
        showToast(t('prefill.toast').replace('{p}', productName), 'info', 3000);
        if (window.openChatWindow) window.openChatWindow();
    } catch(_) {}
}
