import React, { useContext } from 'react';
import { ProductMaterialTable } from './ProductMaterialTable';
import { ProductCharts } from './ProductCharts';
import { AppContext } from './App';
import { ProductMaterialList } from './ProductMaterialList';
import { SideBar } from './SideBar';

export const ProductList = () => {
  const {screenQuery} = useContext(AppContext);

  const renderProductList = (screenQuery) => {
    switch (screenQuery){
      case 'pc':
        return (
          <div className="pc">
            <SideBar />
            <ProductMaterialTable />
            <ProductCharts />
          </div>
        );
      case 'tablet':
        return <ProductMaterialTable />
      default:
        return <ProductMaterialList />
    }
  }

  return (
    <div className="ProductList" >
      {renderProductList(screenQuery)}
    </div>
  );
};
