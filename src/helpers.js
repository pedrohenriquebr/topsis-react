export function criteriaToDataColumns (criteria){
    return [{field: 'name', headerName: 'Nome', width: 200},
    ...criteria.map((d) => ({
    field: d.criterionName,
    headerName: [...d.criterionName[0].toUpperCase(), d.criterionName.slice(1)],
    type: "number",
    width: 160 
  }))]
}