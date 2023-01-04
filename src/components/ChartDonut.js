import React from 'react'
import { Card, DonutChart, Title } from '@tremor/react'

const cities = [
    {
        name: 'Managua',
        sales: 9800
    },
    {
        name: 'Jinotega',
        sales: 4567,
    },
    {
        name: 'Matagalpa',
        sales: 3908,
    },
    {
        name: 'Boaco',
        sales: 2400,
    },
    {
        name: 'Chinandega',
        sales: 1908,
    },
    {
        name: 'Leon',
        sales: 1398,
    },
]

const ChartDonut = () => {
  return (
    <Card>
        <Title>Sales by City</Title>
        <DonutChart 
            data={cities}
            category='sales'
            dataKey='name'
            marginTop='mt-6'
            colors={["yellow", "violet", "indigo", "rose", "cyan", "green"]}
        />
    </Card>
  )
}

export default ChartDonut