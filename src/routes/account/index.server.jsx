import { useSession } from '@shopify/hydrogen/foundation/useSession/useSession';
import { CacheNone } from '@shopify/hydrogen';

import React from 'react'

const index = ({ response }) => {
    response.cache(CacheNone());
    const {customerAccessToken} = useSession();
    if (!customerAccessToken) return response.redirect('/account/login');
  
    return (
        <div>index</div>
    )
}

export default index