import React, {useState, useEffect} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios';
//import Papa from 'papaparse'


const Calculator = () => {
    const [crypto, setCrypto] = useState('');
    const [price, setPrice] = useState([]);
    const [investment, setInvestment] = useState('');
    const [state, setState] = useState({ annual: 0, balance: 0, equivalent: 0 });

    
   useEffect(() => {
       fetchData();
    }, []);
    
    async function fetchData() {
        const result = await axios('https://data.messari.io/api/v2/assets?fields=id,slug,symbol,metrics/market_data/price_usd');
        setPrice(result.data.data);
        //console.log(result.data.data[0].metrics.market_data.price_usd)
    }

    const handleCryptoChange = (event) => {
        setCrypto(event.target.value);
        setState({ annual: 0, balance: 0, equivalent: 0 });
        setInvestment(0);
    };


    const handleInvestmentChange = (event) => {
        setInvestment(event.target.value);
        
    };


    const handleCalc = (data, property, value) => {
        let result = -1;
        data.some(function (item, i) {
            if (item[property] === value) {
                result = i;
                return true;
            } 
        });
        return result;
    }

    
    
    const totalBalance = () => {
        if (crypto === "bitcoin") {
            const coinIndex = handleCalc(price, "slug", "bitcoin");
            const coinPrice = price[coinIndex].metrics.market_data.price_usd;
            const balanceAmount = parseFloat(investment * (Math.pow((1 + (.05 / 12)), (12 * 1)))).toFixed(2);
            const finalAmount = parseFloat(+balanceAmount + +investment).toFixed(2);
            const equivalentAmount = parseFloat(finalAmount / coinPrice).toFixed(2);

            setState({annual: balanceAmount, balance: finalAmount, equivalent: equivalentAmount});
            fetchData();  
        } else if (crypto === "ethereum") {
            const coinIndex = handleCalc(price, "slug", "ethereum");
            const coinPrice = price[coinIndex].metrics.market_data.price_usd;
            const balanceAmount = parseFloat(investment * (Math.pow((1 + (.042 / 12)), (12 * 1)))).toFixed(2);
            const finalAmount = parseFloat(+balanceAmount + +investment).toFixed(2);
            const equivalentAmount = parseFloat(finalAmount / coinPrice).toFixed(2);

            setState({annual: balanceAmount, balance: finalAmount, equivalent: equivalentAmount});
            fetchData();
        } else if (crypto === "cardano") {
            const coinIndex = handleCalc(price, "slug", "cardano");
            const coinPrice = price[coinIndex].metrics.market_data.price_usd;
            const balanceAmount = parseFloat(investment * (Math.pow((1 + (.01 / 12)), (12 * 1)))).toFixed(2);
            const finalAmount = parseFloat(+balanceAmount + +investment).toFixed(2);
            const equivalentAmount = parseFloat(finalAmount / coinPrice).toFixed(2);

            setState({annual: balanceAmount, balance: finalAmount, equivalent: equivalentAmount});
            fetchData();
        } else {
            alert("Please select Cryptocurrency first")
        }
        

    }
 

    return (
        <Card style={{
            width: '40%'
        }}>
            <CardContent style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                textAlign: 'center',
                
            }}>
                <div style={{
                    padding: '10px 20px'
                }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Choose Cryptocurrency</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={crypto}
                                label="Choose Cryptocurrency"
                                onChange={handleCryptoChange}
                                >
                                <MenuItem value={'bitcoin'}>Bitcoin</MenuItem>
                                <MenuItem value={'ethereum'}>Etherium</MenuItem>
                                <MenuItem value={'cardano'}>Cardano</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div
                   style={{
                    padding: '10px 20px'
                    }}>
                    <FormControl fullWidth>
                    <TextField
                        id="outlined-number"
                        label="Investment in Dollars"
                        type="number"
                        value={investment}
                        onChange={handleInvestmentChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                    </FormControl>
                </div>
                <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        textAlign: 'center',
                        
                    }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        textAlign: 'right',
                        flex: 1,
                        padding: '0 15px'
                        
                    }}>
                        <p>Annual Revenue</p>
                        <p>Total Balance per year</p>
                        <p>Total Balance in Cryptocurrency</p>
                    </div>
                        <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        textAlign: 'left',
                        flex: 1,
                        padding: '0 15px'
                    
                    }}>
                        
                        <p style={{
                            color: 'red'
                                
                        }}>$ {state.annual}</p>
                        <p style={{
                            color: 'green'
                                
                        }}>$ {state.balance}</p>
                        <p style={{
                            color: 'blue'
                                
                        }}>$ {state.equivalent}</p>
                    </div>              
                </div>
                
                <div>
                    <Button size="small" onClick={totalBalance}>Calculate/Update</Button>
                </div>
            </CardContent>
        </Card>
  );
}

export default Calculator;