import Grid from "./Grid";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import topsis_predict from "./topsis";


export default function ResultGrid(props) {
    const {t, i18n} = useTranslation();
    
    const columns = [
        {field:'ranking', headerName: '#', type:"number", width: 60},
        {field:'name', headerName: t('DATA_COLUMN_NAME'), width: 160},
    ];

    const [loading, setLoading] = useState(true);
    const [dataset, setDataset] = useState([]);

    useEffect(()=>{
        const _criteria = props.criteria.map(d => ({name: d.criterionName, type: d.type, weight: parseFloat(d.weight/100.0) }))
        const _dataset = props.dataset.map(row => ([..._criteria.map(d => row[d.name]) ] ))
        const result = topsis_predict(_dataset, _criteria);
        setTimeout(() => {
            setDataset(result.map((_idx, idx_ranking )=> ({
                id: idx_ranking,
                name: props.dataset[_idx].name,
                ranking: idx_ranking+1}
            )))
            setLoading(false);
        },1000);
    },[props.criteria, props.dataset]);
    
    return (
    <Grid
    loading={loading}
    dataset={dataset}
    columns={columns}
    />
  );
}
