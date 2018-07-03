import { Button, Position, Toast, Toaster } from "@blueprintjs/core";
import * as React from "react";
 
export default class AppToast extends React.PureComponent {
    state = { toasts: [ /* IToastProps[] */ ] }
 
    toaster: Toaster;
    refHandlers = {
        toaster: (ref: Toaster) => this.toaster = ref,
    }
 
     render() {
        return (
            <div>
                <Button onClick={this.addToast} text="Procure toast" />
                <Toaster position={Position.TOP_RIGHT} ref={this.refHandlers.toaster}>
                    {/* "Toasted!" will appear here after clicking button. */}
                    {this.state.toasts.map(toast => <Toast {...toast} />)}
                </Toaster>
            </div>
        )
    }
 
     addToast = () => {
        this.toaster.show({ message: "Toasted!" });
    }
}