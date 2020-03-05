import React, { useContext, useState, CSSProperties } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { AppContext } from './App';
import { Product, ProductField } from '../types/Product';
import { ListItemSecondaryAction, Fab, TextField } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import { green } from '@material-ui/core/colors';
import { MaterialIconMenu } from './MaterialIconMenu';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { MyModal } from './MyModal/MyModal';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
        menubutton: {

        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        position: 'fixed',
        zIndex: 1,
        bottom: 10,
        right: 10,
        left: 10,
        margin: '0 auto',
        '&:hover': {
            backgroundColor: green[600],
            },
        },
    }),
);

const editFields:{
    err:boolean,helperText:string,valueKey:string,label:string,type:string
}[] = Object.values(Product.productFields)
    .map((pf:ProductField,i) => {
        return {...pf, err:false, helperText: ''}
    });

export const ProductMaterialList = props => {
    const classes = useStyles();
    const {products,f} = useContext(AppContext);
    const [product,setProduct] = useState(new Product());
    // const [showDetail, setShowDetail] = useState(false);    
    const [showEditing,setShowEditing] = useState(false);
    
    const deleteProduct = (id:string) => {
        console.log(`> deleteProduct(${id})`);
        setProduct(new Product());
        setShowEditing(false);
        f.deleteProduct(id);
    }

    const listFuncs:{
        add: () => void;
        edit: (id:string) => void;
        delete: (id:string) => void;
        openDetail: (p:Product) => void;
    } = {
        add: () => {
            console.log(`...listFuncs.add()`);
            setProduct(new Product());
            setShowEditing(true);
        },
        edit: (id:string) => {
            console.log(`...listFuncs.edit(${id})`);
            const np = new Product();
            np.setConfig( {...products.filter(p => p._id === id)[0]} );
            setProduct( np );
            setShowEditing(true);
        },
        delete: deleteProduct,
        openDetail: (p:Product) => {
            setProduct(p);
            // setShowDetail(true);
        }
    }

    const csudFuncs:{
        close:()=>void,
        set: (p:Product) => void,
        update: (key:string,value:string) => boolean,
        delete: (id:string) => void,
    } = {
        close: () => setShowEditing(false),
        set: (p:Product) => {
            console.log(`...csdFuncs.set(${p._id})`);
            console.log(p);
            f.setProduct(p);
            setShowEditing(false);
        },
        update: (key:string,value:string) => {
            // console.log(`...csdFuncs.update(e => [${e.currentTarget.id}] = ${e.currentTarget.value})`);
            // console.log(e);
            product[key] = value;
            setProduct(product);
            if (key === 'sku' && products.filter(p => p.sku === value).length > 0){
                return true;
            }
            return false;
        },
        delete: deleteProduct
    }

    return (
    <List className={classes.root}>
        {products.map((p:Product,i) => (
            <div key={`product-list-item-${i}`}>
                <ProductMaterialListItem 
                    p={p} 
                    avatar= {{alt:p.name,src:p.imageUrl}} 
                    title= {p.name} 
                    classes={classes}
                    editFields={editFields} 
                    listFuncs={listFuncs} />
                <Divider variant="middle" />
            </div>
        ))}
        <Fab color="primary" aria-label="add" className={classes.fabGreen}>
            <AddIcon onClick={() => listFuncs.add()} />
        </Fab>

        <SetProductDialog show={showEditing} p={product} csdFuncs={csudFuncs} editFields={editFields} />
    </List>
    );

}

const ProductMaterialListItem:React.FC<{
    p:Product;
    avatar: {alt:string,src:string};
    title:string;
    classes:any;
    editFields:any[];
    listFuncs:{
        add: () => void;
        edit: (id:string) => void;
        delete: (id:string) => void;
        openDetail: (p:Product) => void;
    }
}> = props => {

    const renderProductDetails = (p:Product) => {
        const pdStyles:CSSProperties = {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            paddingLeft: '20px'
        }
        return (
            <span style={pdStyles} >
                <span>SKU:</span><span>{props.p.sku}</span>
                <span>CostPrice:</span><span>${props.p.costPrice}</span>
                <span>Quantity:</span><span>{props.p.quantity}</span>
            </span>
        )
    }

    // <Avatar alt={props.avatar.alt} src={props.avatar.src} />
    return (
        <ListItem key={`list-item-${props.p._id}`} >
            <ListItemAvatar>
                <MtProductImageThumbnail 
                    p={props.p} 
                    thumbnailHeight={'50px'}  
                    modalImageHeight={'90vw'} />
            </ListItemAvatar>
            <ListItemText
                primary={props.title}
                secondary= {renderProductDetails(props.p)}    
            />
            <ListItemSecondaryAction>
                <MaterialIconMenu 
                    id={`menu-button-${props.p._id}`} 
                    classes={props.classes.menuButton} 
                    icon={<MoreVert />} 
                    edge='end' 
                    menuItems={[
                        {label:'Edit', clickHandler:() => props.listFuncs.edit(props.p._id)},
                        {label:'Delete', clickHandler:() => props.listFuncs.delete(props.p._id)},
                    ]}
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
}

const dialogStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  textInput: {
      width: '100%'
  }
}));

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export const SetProductDialog:React.FC<{
    show:boolean;
    p:Product;
    editFields:{err:boolean,helperText:string,valueKey:string,label:string,type:string}[];
    csdFuncs:{
        close:()=>void,
        set: (p:Product) => void,
        update: (key:string,value:string) => boolean,
        delete: (id:string) => void,
    }
}> = props => {
    const classes = dialogStyles();
    const [editFields,setEditFields] = useState(props.editFields);

    const handleSubmit = (e:React.SyntheticEvent<any, Event>) => {
        e.preventDefault();
        props.csdFuncs.set(props.p);
    }

    const handleChange = (e:React.SyntheticEvent<any, Event>) => {
        const {id : key, value} = e.currentTarget;
        const err = props.csdFuncs.update(key,value);

        // validation
        switch(key){
            case 'sku':
                const efi = editFields.findIndex(ef => ef.valueKey === 'sku');
                editFields[efi] = { 
                    ...editFields[efi], 
                    err:err, 
                    helperText:err ? 'SKUs must be unique.' : '',
                }
                setEditFields([...editFields]);
                return;
            default:
                return;
        }
    }

  return (
    <div>
      <Dialog fullScreen open={props.show} onClose={() => props.csdFuncs.close()} TransitionComponent={Transition}>

        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => props.csdFuncs.close()} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                {props.p.sku ? 'Edit' : 'New Product'}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => props.csdFuncs.set(props.p)}>
                Save
            </Button>
          </Toolbar>
        </AppBar>

        <form className="ProductMaterialListEditModal" 
            noValidate 
            autoComplete="off" 
            onSubmit={handleSubmit}>

            <List>  
                {editFields.map((ef,i) => (
                    <ListItem key={ef.valueKey}  >
                        <TextField 
                            required 
                            error={ef.err}
                            helperText={ef.helperText} 
                            id={ef.valueKey} 
                            label={ef.label} 
                            defaultValue={props.p._id ? props.p[ef.valueKey] : null} 
                            variant="outlined"
                            type={ef.type} 
                            className={classes.textInput}
                            onChange= {handleChange} />
                    </ListItem>
                ))}
            </List>
            <input type="submit" style={{display: 'none'}} />
        </form>

      </Dialog>
    </div>
  );
}

const MtProductImageThumbnail:React.FC<{
    p:Product;
    thumbnailHeight: string;
    modalImageHeight: string;
}> = props => {

    const thumbnailImgStyles:CSSProperties = {
      height: props.thumbnailHeight,
      width: 'auto',
    //   borderRadius: "50%",
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