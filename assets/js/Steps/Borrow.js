import React, { useEffect } from 'react';
import { Container, Row, Col, Alert, Table, Button } from 'react-bootstrap';
import BarcodeScanner from './BarcodeScanner';
import PropTypes from 'prop-types';
import {
    BARCODE_COMMAND_FINISH,
    BARCODE_COMMAND_LENGTH,
    BARCODE_SCANNING_TIMEOUT
} from '../constants';

/**
 * Borrow component.
 *
 * Supplies a page for borrowing materials.
 *
 * @param props
 * @return {*}
 * @constructor
 */
function Borrow(props) {
    const { actionHandler, handleReset } = props;

    useEffect(() => {
        const barcodeScanner = new BarcodeScanner(BARCODE_SCANNING_TIMEOUT);

        const barcodeCallback = code => {
            if (code.length === BARCODE_COMMAND_LENGTH) {
                if (code === BARCODE_COMMAND_FINISH) {
                    handleReset();
                }
                return;
            }

            actionHandler('borrowMaterial', {
                itemIdentifier: code
            });
        };

        barcodeScanner.start(barcodeCallback);
        return () => {
            barcodeScanner.stop();
        };
    }, [actionHandler, handleReset]);

    // Return nothing if no machineState is set.
    if (!Object.prototype.hasOwnProperty.call(props, 'machineState')) {
        return;
    }

    return (
        <Container>
            <h1>Borrow</h1>

            {props.machineState.user &&
                <div>
                    <p>Hej {props.machineState.user.name}</p>
                    {props.machineState.user.birthdayToday &&
                    <p>Tillykke med fødselsdagen</p>
                    }
                </div>
            }
            <Row>
                <Col>
                    <Alert variant={'info'}>Skan materialer</Alert>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Materials</h2>

                    <Table striped={true} bordered={true}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>title</th>
                                <th>author</th>
                                <th>status</th>
                                <th>renewalOk</th>
                                <th>message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.machineState.materials && props.machineState.materials.map(
                                    el => <tr key={'material-' + el.itemIdentifier}>
                                        <td>{el.itemIdentifier}</td>
                                        <td>{el.title}</td>
                                        <td>{el.author}</td>
                                        <td>{el.status}</td>
                                        <td>{el.renewalOk ? 'Yes' : 'No'}</td>
                                        <td>{el.message}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant={'primary'} onClick={props.handleReset}>
                        Tilbage
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

Borrow.propTypes = {
    actionHandler: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    machineState: PropTypes.object.isRequired
};

export default Borrow;
