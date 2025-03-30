import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ProductFormData {
  images: string[];
  name: string;
  phone: string;
  address: string;
  description: string;
  price: string;
  currency: string;
  qrCode: string;
}

const ProductForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<ProductFormData>({
    images: [],
    name: '',
    phone: '',
    address: '',
    description: '',
    price: '',
    currency: 'CNY',
    qrCode: ''
  });
  const [generatedLink, setGeneratedLink] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, field: 'images' | 'qrCode') => {
    const files = event.target.files;
    if (files && field === 'images') {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, reader.result as string].slice(0, 4)
          }));
        };
        reader.readAsDataURL(file);
      });
    } else if (files && field === 'qrCode') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          qrCode: reader.result as string
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLanguageChange = (event: any) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const submitData = {
        images: formData.images,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        description: formData.description,
        price: formData.price,
        currency: formData.currency,
        qrCode: formData.qrCode
      };
      
      // 压缩图片数据
      const compressedData = {
        ...submitData,
        images: submitData.images.map(img => img.split(',')[1]),
        qrCode: submitData.qrCode.split(',')[1]
      };
      
      // 生成编码数据
      const encodedData = encodeURIComponent(JSON.stringify(compressedData));
      
      // 生成完整的URL（使用window.location.origin获取当前域名）
      const fullUrl = `${window.location.origin}/product/${encodedData}`;
      
      // 保存到 localStorage
      localStorage.setItem(`product_${encodedData}`, JSON.stringify(submitData));
      
      // 更新生成的链接状态
      setGeneratedLink(fullUrl);
      
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交失败，请重试。可能是数据太大，请尝试减少图片大小或数量。');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      alert('链接已成功复制到剪贴板！');
    } catch (err) {
      console.error('复制失败:', err);
      alert('复制失败，请手动复制链接。');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('title')}
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="language-select-label">{t('languageSelector')}</InputLabel>
            <Select
              labelId="language-select-label"
              value={i18n.language}
              label={t('languageSelector')}
              onChange={handleLanguageChange}
            >
              <MenuItem value="zh">中文</MenuItem>
              <MenuItem value="ja">日本語</MenuItem>
              <MenuItem value="ko">한국어</MenuItem>
              <MenuItem value="ms">Bahasa Melayu</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
            <Typography variant="subtitle1">{t('uploadImage')}</Typography>
            <input
              accept="image/*"
              type="file"
              multiple
              onChange={(e) => handleImageUpload(e, 'images')}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span">
                {t('uploadImage')} (最多4张)
              </Button>
            </label>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, width: '100%' }}>
              {formData.images.map((image, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <img src={image} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ position: 'absolute', top: 8, right: 8, minWidth: '30px', width: '30px', height: '30px', p: 0 }}
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index)
                    }))}
                  >
                    ×
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>

          <TextField
            required
            fullWidth
            label={t('name')}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />

          <TextField
            required
            fullWidth
            label={t('phone')}
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />

          <TextField
            required
            fullWidth
            label={t('address')}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />

          <TextField
            required
            fullWidth
            multiline
            rows={4}
            label={t('description')}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              required
              fullWidth
              label={t('price')}
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              sx={{ flexGrow: 1 }}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="currency-select-label">{t('currency')}</InputLabel>
              <Select
                labelId="currency-select-label"
                name="currency"
                value={formData.currency}
                label={t('currency')}
                onChange={handleInputChange as any}
              >
                <MenuItem value="CNY">CNY ¥</MenuItem>
                <MenuItem value="USD">USD $</MenuItem>
                <MenuItem value="JPY">JPY ¥</MenuItem>
                <MenuItem value="KRW">KRW ₩</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
            <Typography variant="subtitle1">{t('uploadQRCode')}</Typography>
            <input
              accept="image/*"
              type="file"
              onChange={(e) => handleImageUpload(e, 'qrCode')}
              style={{ display: 'none' }}
              id="qr-code-upload"
            />
            <label htmlFor="qr-code-upload">
              <Button variant="contained" component="span">
                {t('uploadQRCode')}
              </Button>
            </label>
            {formData.qrCode && (
              <img src={formData.qrCode} alt="QR Code" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button type="submit" variant="contained" color="primary" size="large">
              {t('submit')}
            </Button>

            {generatedLink && (
              <Paper sx={{ p: 2, mt: 2, bgcolor: '#f5f5f5' }}>
                <Typography variant="subtitle1" gutterBottom>
                  {t('generatedLink')}:
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    value={generatedLink}
                    InputProps={{
                      readOnly: true,
                      sx: { bgcolor: 'white' }
                    }}
                  />
                  <Button 
                    variant="contained" 
                    onClick={copyToClipboard}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    {t('copy')}
                  </Button>
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => window.open(generatedLink, '_blank')}
                >
                  {t('preview')}
                </Button>
              </Paper>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductForm;