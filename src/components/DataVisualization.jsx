import React, { useState, useEffect } from 'react'
import { services } from '../services'
import { PieChart, Pie, Cell } from 'recharts'
import CustomPlaceholder from './CustomPlaceholder'

const DataVisualization = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [orgData, setOrgData] = useState(null)
    const [projData, setProjData] = useState(null)
    const [orgWithProjNo, setOrgWithProjNo] = useState(null) // Organization with number of projects associated on it
    const [orgWithColorCode, setOrgWithColorCode] = useState(null)

    // GET-DATA
    useEffect(() => {
        // Organization-data
        services.GET.organizationData()
            .then((response) => {
                if (response.status === 200) {
                    setOrgData(response.data.results)
                }
            })
            .catch((errors) => {
                console.error('Get-orgData-errors:', errors)
            })

        // Project-data
        services.GET.projectData()
            .then((response) => {
                if (response.status === 200) {
                    setProjData(response.data.results)
                }
            })
            .catch((errors) => {
                console.error('Get-projData-errors:', errors)
            })
        setIsLoading(false)
    }, [])

    useEffect(() => {
        if (orgData && projData) {
            const arrObjOfOrgWithProj = [] // Array of Objects that contains organization-name and nuber-of-projects associated under it;
            const arrObjOrgWithColorCode = []

            for (let i = 0; i < orgData.length; i++) {
                let nProj = 0,
                    orgName = ''

                for (let j = 0; j < projData.length; j++) {
                    if (orgData[i].oid === projData[j].oid) {
                        orgName = orgData[i].oname
                        nProj = nProj + 1
                    }
                }
                if (nProj > 0) {
                    arrObjOfOrgWithProj.push({ name: orgName, value: nProj })
                }
            }

            // Generate Colors
            for (let i = 0; i < arrObjOfOrgWithProj.length; i++) {
                arrObjOrgWithColorCode.push({
                    orgName: arrObjOfOrgWithProj[i].name,
                    color: generateColor(),
                    nProject: arrObjOfOrgWithProj[i].value,
                })
            }

            setOrgWithColorCode(arrObjOrgWithColorCode)
            setOrgWithProjNo(arrObjOfOrgWithProj)
        }
    }, [orgData, projData])

    function generateColor() {
        return '#' + Math.random().toString(16).substr(-6)
    }

    return (
        <>
            {isLoading && <CustomPlaceholder />}

            <div className="data-pie">
                {orgWithProjNo && (
                    <PieChart width={400} height={400}>
                        <Pie
                            data={orgWithProjNo}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={100}
                            fill="#82ca9d"
                            label
                        >
                            {orgWithColorCode &&
                                orgWithColorCode.map((entry, index) => (
                                    <Cell
                                        key={`key-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                        </Pie>
                    </PieChart>
                )}
            </div>

            <div className="data-info">
                {orgWithColorCode && (
                    <ul className="data-info__lists">
                        {orgWithColorCode.map((org, index) => {
                            return (
                                <li key={`proj-key-${index}`}>
                                    <span
                                        className=" data-info__org-name"
                                        style={{
                                            backgroundColor: org.color,
                                        }}
                                    ></span>
                                    <span className="col">
                                        <span className="data-info__color-code">
                                            {org.orgName}
                                        </span>
                                        <span className="data-info__tot-project">
                                            Total-Projects:{org.nProject}
                                        </span>
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </>
    )
}

export default DataVisualization
