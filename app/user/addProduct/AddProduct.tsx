import React, { useState } from 'react';
import PageContainer from '../../components/containers/PageContainer';
import { FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // React Icons'dan çöp kutusu ve ok simgeleri
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import WarningText from '../../components/WarningText';
import AuthContainer from '../../components/containers/AuthContainer';
import CreateForm from '../../components/CreateForm';

const AddProduct: React.FC = async() => {
  const currentUser=await getCurrentUser()

  if(!currentUser){
    return (
        <WarningText text='Ürün eklemek için lütfen üye girişi yapınız.' />
    )
  }




  return(

    <AuthContainer>
      
      <CreateForm/>
      
    </AuthContainer>
    
  )
};

export default AddProduct;
