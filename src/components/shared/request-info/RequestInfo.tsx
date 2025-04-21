import React, { useEffect, useState } from 'react'
import { tesloApi } from '../../../api/testlo.api';

const RequestInfo = () => {
  const [requestInfo, setRequestInfo] = useState<unknown>();

  useEffect(() => {
    tesloApi.get('/auth/private')
      .then(res => setRequestInfo(res.data))
      .catch( () => setRequestInfo('Error'))
  }, [])

  return (
    <>
      <h2>Info</h2>
      <pre>
        {
          JSON.stringify(requestInfo, null, 2)
        }
      </pre>
    </>
  )
}

export default RequestInfo
