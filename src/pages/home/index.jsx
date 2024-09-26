import BarCharts from "./components/Barcharts";
const Home = () => {
    return (
        <div>
            <BarCharts title={"三大框架满意度"} xData={['Vue', 'React', 'Angular']}  />
            <BarCharts title={"三大框架使用度"} xData={['Vue', 'React', 'Angular']} />
        </div>
    )
}

export default Home;