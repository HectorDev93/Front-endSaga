import React from "react";
//import Highcharts from "highcharts";
//import { Link } from "react-router-dom";
//import HeaderContent from "../../common/HeaderContent";
import Box from "./Box";

import Spinner from "../../../components/common/Spinner";
//import If, { Else } from "if-else-react";
import { connect } from "react-redux";
import {
  listCountGraph,
  listCountStatistic,
  setStatisticDefaults,
  handleStatisticChange,
} from "../../../store/actions/StatisticActions";

import { userByType } from "../../../store/actions/UserActions";
import ChartDash from "../../common/ChartDash";
//import Count from "../../common/Count";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    /* var today,
      year = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      dateYear = year.getFullYear();
    dateYear = 2021; */

    document.body.classList.remove("login-page");
    document.body.classList.remove("bg");
    document.body.classList.add("skin-green");
    this.state = {
      ini: [],
      monthNow: 0,
      yearNow: 2021,
      userNow: localStorage.getItem("user.id"),
      userR: localStorage.getItem("user.role_id"),
      support: "0",
      isView: false,
      /* series: [
        {
          name: "Gases",
          data: [
            {
              name: "Argon",
              y: 0.9,
              color: "#3498db",
            },
            {
              name: "Nitrogen",
              y: 78.1,
              color: "#9b59b6",
            },
            {
              name: "Oxygen",
              y: 20.9,
              color: "#2ecc71",
            },
            {
              name: "Trace Gases",
              y: 0.1,
              color: "#f1c40f",
            },
          ],
        },
      ], */
    };

    this.handleStatisticChange = this.handleStatisticChange.bind(this);
    this.props.setStatisticDefaults();
  }

  /* highChartsRender() {
    Highcharts.chart({
      chart: {
        type: "pie",
        renderTo: "atmospheric-composition",
      },
      title: {
        verticalAlign: "middle",
        floating: true,
        text: "Earth's Atmospheric Composition",
        style: {
          fontSize: "10px",
        },
      },
      tooltip: {
        valueSuffix: "%",
        borderColor: "#8ae",
      },
      plotOptions: {
        pie: {
          dataLabels: {
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
          innerSize: "10%",
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              plotOptions: {
                series: {
                  dataLabels: {
                    format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                  },
                },
              },
            },
          },
        ],
      },
      series: this.state.series,
    });
  } */
  componentDidUpdate() {
    //this.props.handleStatisticChange("userNow", localStorage.getItem("user.id"));

    window.addEventListener("storage", (e) => {
      console.log(e);
      if (e.oldValue !== e.newValue) {
        //alert("hey cambiaste el local storage");
        localStorage.clear();
        window.location.reload();
      }
      // TODO: Algunos valores útiles { key, newValue, oldvalue } = e;
    });
  }
  async componentDidMount() {
    //alert(localStorage.getItem("user.id"));
    //this.props.handleStatisticChange("userNow", localStorage.getItem('user.id'));
    if (this.state.userR === "3") {
      this.props.handleStatisticChange("userNow", 0);
      setTimeout(() => {
        this.props.listCountStatistic(
          this.props.statistic.selection.monthNow,
          this.props.statistic.selection.userNow,
          this.props.statistic.selection.yearNow
        );
        this.props.listCountGraph(
          this.props.statistic.selection.monthNow,
          this.props.statistic.selection.userNow,
          this.props.statistic.selection.yearNow
        );
      }, 1);
    } else {
      this.props.handleStatisticChange("userNow", localStorage.getItem('user.id'));
      //console.log(this.props.statistic.selection.userNow);
      setTimeout(() => {
      this.props.listCountStatistic(
        this.props.statistic.selection.monthNow,
        this.props.statistic.selection.userNow,
        this.props.statistic.selection.yearNow
      );
      this.props.listCountGraph(
        this.props.statistic.selection.monthNow,
        this.props.statistic.selection.userNow,
        this.props.statistic.selection.yearNow
      );
    }, 1);
    }

    //this.props.setStatisticDefaults();
    /* const user = localStorage.getItem("user.id");
    const userType = localStorage.getItem("user.usertype_id");
 */
    this.props.userByType(1);

    //this.onStartLoad(this.state.isView);

    //this.highChartsRender();
  }

  handleStatisticChange(e) {
    e.preventDefault();
    this.props.handleStatisticChange(e.target.name, e.target.value);
    setTimeout(() => {
      this.props.listCountStatistic(
        this.props.statistic.selection.monthNow,
        this.props.statistic.selection.userNow,
        this.props.statistic.selection.yearNow
      );

      this.props.listCountGraph(
        this.props.statistic.selection.monthNow,
        this.props.statistic.selection.userNow,
        this.props.statistic.selection.yearNow
      );
    }, 1);
  }
  onStartLoad(view) {
    if (view) {
      this.props.listCountStatistic(0, 0, this.state.yearNow);
      this.props.listCountGraph(0, 0, this.state.yearNow);
    } else {
      /* this.props.listCountStatistic(0, 1, this.state.yearNow);
      this.props.listCountGraph(0, 1, this.state.yearNow); */
      this.props.listCountStatistic(
        0,
        localStorage.getItem("user.id"),
        this.state.yearNow
      );
      this.props.listCountGraph(
        0,
        localStorage.getItem("user.id"),
        this.state.yearNow
      );
    }
  }

  updateYear(e) {
    this.setState((state) => {
      return { yearNow: e.target.value };
    });
  }

  handleChangeYear = (e) => {
    this.updateYear(e);
    console.log(this.state.yearNow);
    this.props.listCountStatistic(
      this.state.monthNow,
      this.state.userNow,
      this.state.yearNow
    );
    this.props.listCountGraph(
      this.state.monthNow,
      this.state.userNow,
      this.state.yearNow
    );
  };
  componentWillUnmount() {
    //this.props.setStatisticDefaults();
  }
  render() {
   /*  const supports = [
      { id: "1", name: "support" },
      { id: "2", name: "general" },
    ]; */
    const years = [
      {
        id: "0",
        name: 2021,
      },
      {
        id: "1",
        name: 2022,
      },
      {
        id: "2",
        name: 2023,
      }
    ];
    const months = [
      {
        id: "0",
        name: "Todos",
      },
      {
        id: "1",
        name: "Enero",
      },
      {
        id: "2",
        name: "Febrero",
      },
      {
        id: "3",
        name: "Marzo",
      },
      {
        id: "4",
        name: "Abril",
      },
      {
        id: "5",
        name: "Mayo",
      },
      {
        id: "6",
        name: "Junio",
      },
      {
        id: "7",
        name: "Julio",
      },
      {
        id: "8",
        name: "Agosto",
      },
      {
        id: "9",
        name: "Septiembre",
      },
      {
        id: "10",
        name: "Octubre",
      },
      {
        id: "11",
        name: "Noviembre",
      },
      {
        id: "12",
        name: "Deciembre",
      },
    ];
    /* const counts = [
      {
        id: "001",
        countLabel: "Colaboradores atendidos",
        number: this.props.statistic.obj.allCollaboratorsMonth
          ? this.props.statistic.obj.allCollaboratorsMonth.toString()
          : "0",
        to: "/admin/users",
        styleBox: "bg-info",
        iconModel: "fas fa-users",
        duration: "0",
      },
      {
        id: "002",
        countLabel: "Sociedad mas atendida: ",
        label: this.props.statistic.obj.societyMayor,
        number: this.props.statistic.obj.allSocietyMonth.toString()
          ? this.props.statistic.obj.allSocietyMonth.toString()
          : "0",
        to: "/admin/societies",
        styleBox: "bg-green",
        iconModel: "fas fa-city",
        duration: "0",
      },
      {
        id: "003",
        countLabel: "Departamento mas atendido: ",
        label: this.props.statistic.obj.departmentMayor,
        number: this.props.statistic.obj.allDepartmentMonth
          ? this.props.statistic.obj.allDepartmentMonth.toString()
          : "0",
        to: "/admin/departments",
        styleBox: "bg-yellow",
        iconModel: "fas fa-building",
        duration: "0",
      },
      {
        id: "004",
        countLabel: "Categoria mas atendida: ",
        label: this.props.statistic.obj.categoryMayor,
        number: this.props.statistic.obj.allCategoryMonth
          ? this.props.statistic.obj.allCategoryMonth.toString()
          : "0",
        to: "/admin/categories",
        styleBox: "bg-red",
        iconModel: "fas fa-building",
        duration: "0",
      },
    ]; */
    const optionsMonth = months.map((month) => {
      return (
        <option className="select-custom" key={month.id} value={month.id}>
          {month.name}
        </option>
      );
    });
    const optionsYear = years.map((year) => {
      return (
        <option className="select-custom" key={year.id} value={year.name}>
          {year.name}
        </option>
      );
    });

    //const user = localStorage.getItem("user.id");
   // const userRole = localStorage.getItem("user.role_id");

    return (
      <div className="content-wrapper">
        <section className="content">
          {/*    <div className="row">
            {counts.map(count => <Count key={count.id} data={count}/>)} 
            </div> */}

          <div className="row">
            <div className="col-md-4">
              {/* <HeaderContent
              index="Home"
              property="Dashboard"
              iconProperty="fas fa-tachometer-alt"
              show={this.props.statistic.list_spinner}
            /> */}
            </div>

            <div className="col-md-2">
              <Spinner show={this.props.statistic.list_spinner} />
            </div>

            {localStorage.getItem("user.role_id") === "3" ? (
              <div className="col-md-2 ">
                <label htmlFor="support">Seleciona IT</label>
                <select
                  id="support"
                  className="form-control form-control-sm select-custom"
                  name="userNow"
                  // onChange={handleChangeSupport}
                  onChange={this.handleStatisticChange}
                  value={
                    this.props.statistic.selection.userNow
                      ? this.props.statistic.selection.userNow
                      : " "
                  }
                >
                  <option key="0" value="0">
                    Todos
                  </option>
                  {this.props.allUserType.map((ut) => {
                    return (
                      <option
                        className="select-custom"
                        key={ut.id}
                        value={ut.id}
                      >
                        {ut.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : null}
            <div className="col-md-2 ">
              <label htmlFor="year">Año trabajado</label>
              <select
                id="year"
                className="form-control form-control-sm select-custom"
                name="yearNow"
                // onChange={this.handleChangeYear}
                onChange={this.handleStatisticChange}
                value={this.props.statistic.selection.yearNow}
              >
                {optionsYear}
              </select>
            </div>
            <div className="col-md-2 ">
              <label htmlFor="month">Mes trabajado</label>
              <select
                id="month"
                className="form-control form-control-sm"
                name="monthNow"
                // onChange={handleChangeMonth}
                onChange={this.handleStatisticChange}
                value={this.props.statistic.selection.monthNow}
              >
                {optionsMonth}
              </select>
            </div>
          </div>

          <div className="row">
            <Box
              styleBox="bg-info"
              count={
                this.props.statistic.obj.allCollaboratorsMonth
                  ? this.props.statistic.obj.allCollaboratorsMonth
                  : "0"
              }
              countLabel="Empleados asistidos"
              iconModel="fas fa-users"
              to="/admin/users"
            />
            <Box
              styleBox="bg-green"
              count={
                this.props.statistic.obj.allSocietyMonth
                  ? this.props.statistic.obj.allSocietyMonth
                  : "0"
              }
              countLabel={
                "Most attended society: " +
                this.props.statistic.obj.societyMayor
                  ? this.props.statistic.obj.societyMayor
                  : " "
              }
              //label="Sociedad más atendida"
              iconModel="fas fa-city"
              to="/admin/societies"
            />
            <Box
              styleBox="bg-yellow"
              count={
                this.props.statistic.obj.allDepartmentMonth
                  ? this.props.statistic.obj.allDepartmentMonth
                  : "0"
              }
              countLabel={
                "Most attended department: " +
                this.props.statistic.obj.departmentMayor
                  ? this.props.statistic.obj.departmentMayor
                  : " "
              }
              //label="Departamento más atendido"
              iconModel="fas fa-building"
              to="/admin/departments"
            />
            <Box
              styleBox="bg-red"
              count={
                this.props.statistic.obj.allCategoryMonth
                  ? this.props.statistic.obj.allCategoryMonth
                  : "0"
              }
              countLabel={
                "Most attended categories: " +
                this.props.statistic.obj.categoryMayor
                  ? this.props.statistic.obj.categoryMayor
                  : " "
              }
              // label="Categoria más atendida"
              iconModel="fas fa-clipboard-list"
              to="/admin/categories"
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <ChartDash
                type="bar"
                labelTitle="Actividades por sociedad"
                labels={this.props.statistic.chartSociety.labels}
                dataset={this.props.statistic.chartSociety.dataset}
                colours={this.props.statistic.chartSociety.colours}
              />
            </div>
            <div className="col-md-6">
              <ChartDash
                type="bar"
                labelTitle="Actividades por localidad"
                labels={this.props.statistic.chartLocation.labels}
                dataset={this.props.statistic.chartLocation.dataset}
                colours={this.props.statistic.chartLocation.colours}
              />
            </div>
          </div>
          <div className="row">
            <section className="col-md-12 connectedSortable">
              {/* <div id="atmospheric-composition"></div> */}

              <ChartDash
                type="bar"
                labelTitle="Actividades por departmento"
                labels={this.props.statistic.chartDepartment.labels}
                dataset={this.props.statistic.chartDepartment.dataset}
                colours={this.props.statistic.chartDepartment.colours}
              />
              <ChartDash
                type="bar"
                labelTitle="Actividades por categoria"
                labels={this.props.statistic.chartCategory.labels}
                dataset={this.props.statistic.chartCategory.dataset}
                colours={this.props.statistic.chartCategory.colours}
              />
            </section>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    statistic: state.statistic,
    allUserType: state.user.allUserType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleStatisticChange: (field, value, checked = null) =>
      dispatch(handleStatisticChange(field, value, checked)),
    listCountStatistic: (id, user, year) =>
      dispatch(listCountStatistic(id, user, year)),
    listCountGraph: (id, user, year) =>
      dispatch(listCountGraph(id, user, year)),
    setStatisticDefaults: () => dispatch(setStatisticDefaults()),
    userByType: (type) => dispatch(userByType(type)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
