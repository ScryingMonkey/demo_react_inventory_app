import React, { useContext, forwardRef, Ref, CSSProperties, useEffect, useState, useRef } from 'react';
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import { AppContext } from './App';
import { Product } from '../types/Product';
import {MyModal} from './Modal/Modal';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { makeStyles } from '@material-ui/core';

type MyMaterialTableColumn = {
    title:string;
    field: string;
    type?: 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency';
    sorting?: boolean;
    searchable? : boolean;
    editable?: 'never' | 'always' | 'onUpdate' | 'onAdd';
    render?: (rowData:any) => React.ReactElement;
    editComponent?: (rowData:any) => React.ReactElement;
    cellStyle?: any;
    headerStyle?: any;
}

export const ProductMaterialTable = props => {
    const {products,f} = useContext(AppContext);

    const columns:MyMaterialTableColumn[] = [
        {title: "SKU", field: "sku"},
        {title: "Name", field: "name"},
        {
            title: "Image", 
            field: "imageUrl", 
            sorting: false,  
            searchable:false,
            headerStyle: {
                textAlign: 'center',
            },
            cellStyle: {
                textAlign: 'center',
            },
            render: (rowData:any) => <MtProductImageThumbnail 
                                        p={rowData} 
                                        thumbnailHeight="30px"
                                        modalImageHeight="60vh" />
        },
        {
            title: "CostPrice", 
            field: "costPrice", 
            type:"currency",
            cellStyle: {
              textAlign: 'left',
            },
        },
        {title: "Quantity", field: "quantity"},
    ]

    const editable = {
        onRowAdd: async newData => {
            try {
                const np = new Product();
                np.setConfig(newData);
                const res = await f.createProduct(np);
                console.log(`...created new product with sku ${res}.`)
                return res;
            } catch (err) {
                console.error(err); //TODO: Surface error is SKU is not unique
            }
        },
        onRowUpdate: async (newData, oldData) => {
            try {
                console.log(`...updating product with sku ${newData.sku}.`)
                // console.log(newData)

                const np = new Product();
                np.setConfig(newData);
                const res = await f.setProduct(np);
                console.log(res)
                return res;
            } catch (err) {
                console.error(err);
                console.error(`Unable to update product with sku ${oldData.sku}`);
            }
        },
        onRowDelete: async oldData => {
            try {
                // console.log(`Attempting to delete product with id: ${oldData._id}`);
                // console.log(oldData);
                const res = await f.deleteProduct(oldData._id);
                // console.log(res)
                return res;
            } catch (err) {
                console.error(err);
            }
        },
      }

    const tableIcons = {
        Add: forwardRef((props, ref:Ref<SVGSVGElement>) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref:Ref<SVGSVGElement>) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref:Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref:Ref<SVGSVGElement>) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref:Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref:Ref<SVGSVGElement>) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref:Ref<SVGSVGElement>) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref:Ref<SVGSVGElement>) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref:Ref<SVGSVGElement>) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref:Ref<SVGSVGElement>) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref:Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref:Ref<SVGSVGElement>) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref:Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref:Ref<SVGSVGElement>) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref:Ref<SVGSVGElement>) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref:Ref<SVGSVGElement>) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref:Ref<SVGSVGElement>) => <ViewColumn {...props} ref={ref} />)
      };



    return (
        <div style={{ maxWidth: "100%" }}>
        <MaterialTable
            icons={tableIcons}
            columns={columns}
            data={products}
            title="Products" 
            editable= {editable} 
            options={{
                sorting: true,
                actionsColumnIndex: 0,
                paging: false,
                exportButton: true,
                headerStyle: {
                    backgroundColor: '#01579b',
                    color: '#FFF'
                }
            }}
        />
      </div>
    )
}

const MtProductImageThumbnail:React.FC<{
    p:Product;
    thumbnailHeight: string;
    modalImageHeight: string;
}> = props => {

    const thumbnailImgStyles:CSSProperties = {
      height: props.thumbnailHeight,
      width: 'auto',
      borderRadius: "50%",
      cursor: 'pointer'
    }
    const modalImgStyles:CSSProperties = {
            height: props.modalImageHeight,
            width: 'auto',
    }
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div>
            <img 
                src={props.p.imageUrl} 
                alt={props.p.imageUrl} 
                style={thumbnailImgStyles}
                onClick={ ()=>setShowModal(true) } />
            <MyModal 
                show={showModal} 
                handleClose={handleCloseModal} 
            >
                <img 
                    src={props.p.imageUrl} 
                    alt={props.p.imageUrl} 
                    style={modalImgStyles} 
                />
            </MyModal>
        </div>
    );
}