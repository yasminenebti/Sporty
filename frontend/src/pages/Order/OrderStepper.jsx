import { Step, StepLabel, Stepper } from "@mui/material"

const steps = [
    "PLACED",
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "CANCELED"
]
const OrderStepper = ({activeStep}) => {
  return (
    <div className="w-full">
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step) =>
            <>
            <Step>
                <StepLabel sx={{fontSize:"44px"}}>{step}</StepLabel>
            </Step></>
            )}
        </Stepper>
    </div>
  )
}

export default OrderStepper