"use client";



import React, { useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../component/navbar';
import Footer from '../component/Footer';
import Baner from '../component/Baner';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import '../Suggestions/style.css';
import toast, { Toaster } from 'react-hot-toast';


const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#65C466',
        opacity: 1,
        border: 0,
        ...(theme.palette.mode === 'dark' && {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...(theme.palette.mode === 'dark' && {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...(theme.palette.mode === 'dark' && {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...(theme.palette.mode === 'dark' && {
      backgroundColor: '#39393D',
    }),
  },
}));

export default function Suggestions() {
  const [hideIdentity, setHideIdentity] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone_number: '',
    department: '',
    subject: '',
    request_type: 'complaint',
  });

  const fileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!hideIdentity) {
      formData.append('name', form.name);
      formData.append('phone_number', form.phone_number);
    } else {
      formData.append('name', 'مجهول');
      formData.append('phone_number', '0000000000');
    }

    formData.append('department', form.department);
    formData.append('subject', form.subject);
    formData.append('request_type', form.request_type);

    if (fileRef.current?.files?.[0]) {
      formData.append('files', fileRef.current.files[0]);
    } else {
      formData.append('files', null);
    }

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/suggestions-complaints`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('تم الإرسال بنجاح');
      setForm({
        name: '',
        phone_number: '',
        department: '',
        subject: '',
        request_type: 'complaint',
      });
      console.log(res.data);
    } catch (error) {
      console.error('Error:', error.response?.data);
      toast.error('حدث خطأ أثناء الإرسال');
    }
  };

  return (
    <div>
      <Toaster position="bottom-center" />
      <Navbar />
      <Baner titel="الشكاوي" uptitle="تواصل معنا" />
      <main className="page container p-6 mx-auto text-center">
        <form onSubmit={handleSubmit} className="form-up flex flex-col items-center">
          <div className='form w-[500px] space-y-4'>
            <FormControlLabel
              className='iosswitch'
              dir='ltr'
              label="إخفاء هويتي"
              control={
                <IOSSwitch
                  sx={{ m: 2 }}
                  checked={hideIdentity}
                  onChange={(e) => setHideIdentity(e.target.checked)}
                />
              }
            />

            {!hideIdentity && (
              <>
                <input
                  className='item-input'
                  type='text'
                  name='name'
                  placeholder='الاسم'
                  onChange={handleChange}
                  value={form.name}
                />
                <input
                  className='item-input'
                  type='text'
                  name='phone_number'
                  placeholder='رقم التواصل'
                  onChange={handleChange}
                  value={form.phone_number}
                />
              </>
            )}

            <select name="department" className='item-input' onChange={handleChange} value={form.department}>
              <option value="">اختر المديرية</option>
              <option value="مديرية 1">المديرية 1</option>
              <option value="مديرية 2">المديرية 2</option>
              <option value="مديرية 3">المديرية 3</option>
            </select>

            <textarea
              name="subject"
              className='h-[200px] item-textarea'
              placeholder='الموضوع'
              onChange={handleChange}
              value={form.subject}
            ></textarea>
            <div className='group-item space-y-4'>
              <input type='file' name='files' ref={fileRef} />
              <button type="submit" className='bg-blue-500 text-white px-6 py-2 rounded'>إرسال</button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
