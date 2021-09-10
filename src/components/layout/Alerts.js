import React from 'react';
import {connect} from 'react-redux'
import propTypes from 'prop-types'
const Alerts = ({alerts})=> alerts !==  null  && alerts.length > 0 &&  alerts.map(alert=>(

    <div key={alert.id} className ="alert alert-danger">
        {alert.msg}
    </div>
))

Alerts.propTypes = {
    alerts: propTypes.array.isRequired
}

const mapStateToProps = (state) => ({ //state is passed in mapStateToProps in when mapStateToProps is called inside connect

    alerts : state.alerts
    //as alert is only state required from reducer this alerts will be avaiable as props to alert component
})
export default connect(mapStateToProps)(Alerts);