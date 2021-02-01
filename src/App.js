import React from 'react'
import DataVisualization from './components/DataVisualization'

const App = () => {
    return (
        <div className="data-visualization">
            <div className="data-visualization__container">
                <div className="data-visualization__header">
                    <h2>Data Visualization</h2>
                </div>
                <div className="data-visualization__body">
                    <DataVisualization />
                </div>
            </div>
        </div>
    )
}

export default App
