import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import api from './config/services'
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  {
    "time": "00:00",
    "amount": 0
  },
  {
      "time": "03:00",
      "amount": 300
  },
  {
      "time": "06:00",
      "amount": 600
  },
  {
      "time": "09:00",
      "amount": 2400
  },
  {
      "time": "12:00",
      "amount": 1500
  },
  {
      "time": "15:00",
      "amount": 2000
  },
  {
      "time": "18:00",
      "amount": 2400
  },
  {
      "time": "21:00",
      "amount": 2400
  },
  {
      "time": "24:00"
  }
];
console.log(data);
export default function Chart() {
  const [getTodaysOrd,setgetTodaysOrd] = React.useState([]);
  const datOfOrders = []
  const setTimeData = async (data)=>{
    try {
      const { data } = await api.get("/billing/getTodaysOrders")
      setgetTodaysOrd(data)
      console.log(data);
      data.map((d)=>{
        console.log(new Date(d.createdAt).getHours());
        datOfOrders.push({
          "time": new Date(d.createdAt).getHours(),
          "amount": d.billAmt
      })
      })
      console.log(datOfOrders);
    } catch (error) {
      console.log(error);
    } 
  }
  const theme = useTheme();
  React.useEffect(()=>{
    setTimeData()
  },[])
  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={getTodaysOrd}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales (₹)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}