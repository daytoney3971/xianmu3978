import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  zh: {
    translation: {
      title: '商品详情',
      name: '名称',
      phone: '电话',
      address: '地址',
      description: '描述',
      price: '价格',
      qrCode: '支付二维码',
      submit: '提交',
      uploadImage: '上传图片',
      uploadQRCode: '上传二维码',
      currency: '货币',
      languageSelector: '选择语言',
      generatedLink: '生成的链接',
      copy: '复制链接'
    }
  },
  ja: {
    translation: {
      title: '商品詳細',
      name: '名前',
      phone: '電話番号',
      address: '住所',
      description: '説明',
      price: '価格',
      qrCode: '支払いQRコード',
      submit: '送信',
      uploadImage: '画像をアップロード',
      uploadQRCode: 'QRコードをアップロード',
      currency: '通貨',
      languageSelector: '言語を選択',
      generatedLink: '生成されたリンク',
      copy: 'リンクをコピー'
    }
  },
  ko: {
    translation: {
      title: '상품 상세',
      name: '이름',
      phone: '전화번호',
      address: '주소',
      description: '설명',
      price: '가격',
      qrCode: '결제 QR코드',
      submit: '제출',
      uploadImage: '이미지 업로드',
      uploadQRCode: 'QR코드 업로드',
      currency: '통화',
      languageSelector: '언어 선택',
      generatedLink: '생성된 링크',
      copy: '링크 복사'
    }
  },
  ms: {
    translation: {
      title: 'Butiran Produk',
      name: 'Nama',
      phone: 'Telefon',
      address: 'Alamat',
      description: 'Penerangan',
      price: 'Harga',
      qrCode: 'Kod QR Pembayaran',
      submit: 'Hantar',
      uploadImage: 'Muat Naik Imej',
      uploadQRCode: 'Muat Naik Kod QR',
      currency: 'Mata Wang',
      languageSelector: 'Pilih Bahasa',
      generatedLink: 'Pautan yang Dijana',
      copy: 'Salin Pautan'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;