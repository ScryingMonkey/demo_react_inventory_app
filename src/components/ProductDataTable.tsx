import React, { useContext, useEffect, CSSProperties } from 'react';
import {Table, TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';
import {Edit, DeleteOutlined} from "@material-ui/icons";

import {Product} from '../types/Product';
import { makeStyles } from '@material-ui/core';
import { AppContext } from './App';
import { useHistory } from 'react-router-dom';

const columns = Product.productFields;
let rows = [];
const actionCell:CSSProperties = {
    display:'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'space-around',
}
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});

export const ProductDataTable:React.FC<{}> = props => {

    const classes = useStyles(); 
    const rowHeight = '50px'

    const {products,f} = useContext(AppContext);
    const history = useHistory();
    const editHandler = (id: string) => {
      console.log('> ProductList.editHandler()');
      history.push(`/products/${id}/edit`);
    };
    const deleteHandler = (id: string) => {
      f.deleteProduct(id);
    };

return (
<div className='ProjectsTable'>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        {/* <colgroup>
        <col style={{width:'10%'}} />
        <col style={{width:'30%'}} />
        <col style={{width:'10%'}} />
        <col style={{width:'20%'}} />
        <col style={{width:'20%'}} />
        </colgroup> */}
        <TableHead>
          <TableRow>
            <TableCell align="left">SKU</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">CostPrice</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p:Product) => (
            <TableRow key={p._id}>
                <TableCell component="th" scope="row" align="left">{p.sku}</TableCell>
                <TableCell align="left">
                <Edit 
                  onClick={() => editHandler(p._id)}
                  color="action"
                  />
                </TableCell>
                <TableCell align="left">{p.name}</TableCell>
                <TableCell align="center">
                  <ProductImageThumbnail imageUrl={p.imageUrl} imageHeight={rowHeight}/>
                </TableCell>
                <TableCell align="right">{p.costPrice}</TableCell>
                <TableCell align="right">{p.quantity}</TableCell>               
                <TableCell align="center">
                <DeleteOutlined 
                  onClick={() => deleteHandler(p._id)}
                  color="action"
                  />
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</div>
);
}

const ProductListActionButtons:React.FC<{
  id: string;
  editHandler: (id:string) => void;
  deleteHandler: (id:string) => void;
}> = props => {

return (
<div className='ProductListActionButtons'>
<Edit 
  onClick={() => props.editHandler(props.id)}
  color="action"
  />

</div>
);
}

const ProductImageThumbnail:React.FC<{
  imageUrl:string;
  imageHeight: string;
  }> = props => {
  const imgStyles:CSSProperties = {
    height: props.imageHeight,
    width: 'auto',
  }
  return (
    <img src={props.imageUrl} alt={props.imageUrl} style={imgStyles} />
  );
  }