import React, { useContext } from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { AppContext } from './App';
import { BarChart,CartesianGrid,Bar,XAxis,YAxis,Tooltip,LabelList } from 'recharts';

export const ProductCharts:React.FC<{

}> = props => {
    //TODO: Make some charts!

    const {products} = useContext(AppContext);

    const divStyles:CSSProperties = {
        padding: 20
    }

    const data = products.map(
        (p,i):{name:string,sku:string,costPrice: number,} => {
        return { 
            name:p.name, 
            sku:p.sku,
            costPrice:parseFloat(p.costPrice) }
    });

    return (
        <div className='ProductCharts' style={divStyles} >
            
                <h1>Charts</h1>
                <p>This is where we would provide contextural information.</p>
                <BarChart width={350} height={250} data={data}>
                        <CartesianGrid strokeDasharray="3 0" vertical={false} />
                        <YAxis  />
                        <XAxis dataKey="sku" allowDecimals={true} />
                        <Tooltip payload={data} />
                        <Bar dataKey="costPrice" fill="#82ca9d" >
                            <LabelList dataKey="Height" position="top" />
                        </Bar>
                    </BarChart>
            
        </div>
    );
}