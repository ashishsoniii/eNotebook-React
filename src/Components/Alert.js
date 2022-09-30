import React from 'react'

function Alerts(props) {


    return (
        // props.alert && is used if this props.alert is null then further statement will not be executed but when it is not null then statement after && will be executed!
        <div className="alert alert-primary alert-dismissible fade show" role="alert">
            <strong className='align-items-center '>

                {props.msg}
            </strong>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

        </div>

    )
}

export default Alerts
