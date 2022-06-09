<div id=":ol" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0.">
    <div id=":om" class="a3s aiL "><u></u>
        <div marginwidth="0" marginheight="0" style="padding:0">
            <div id="m_8980543069595058581wrapper" dir="ltr"
                 style="background-color:#f7f7f7;margin:0;padding:70px 0;width:100%">
                <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
                    <tbody>
                    <tr>
                        <td align="center" valign="top">
                            <div id="m_8980543069595058581template_header_image">
                            </div>
                            <table border="0" cellpadding="0" cellspacing="0" width="600"
                                   id="m_8980543069595058581template_container"
                                   style="background-color:#ffffff;border:1px solid #dedede;border-radius:3px">
                                <tbody>
                                <tr>
                                    <td align="center" valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                               id="m_8980543069595058581template_header"
                                               style="background-color:#62A19B;color:#ffffff;border-bottom:0;font-weight:bold;line-height:100%;vertical-align:middle;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;border-radius:3px 3px 0 0">
                                            <tbody>
                                            <tr>
                                                <td id="m_8980543069595058581header_wrapper"
                                                    style="padding:36px 48px;display:block">
                                                    <h1 style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:30px;font-weight:300;line-height:150%;margin:0;text-align:left;color:#ffffff;background-color:inherit">
                                                        {{__("New vendor order")}}</h1>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0" width="600"
                                               id="m_8980543069595058581template_body">
                                            <tbody>
                                            <tr>
                                                <td valign="top" id="m_8980543069595058581body_content"
                                                    style="background-color:#ffffff">
                                                    <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                        <tbody>
                                                        <tr>
                                                            <td valign="top" style="padding:48px 48px 32px">
                                                                <div id="m_8980543069595058581body_content_inner"
                                                                     style="color:#636363;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:14px;line-height:150%;text-align:left">
                                                                    <p style="margin:0 0 16px">{{__("Just to let you know we've received your order :order_number, and it is now being processed", ['order_number' => __($data['order_number'])])}}</p>
                                                                    <table cellspacing="0" cellpadding="6" border="1"
                                                                           style="width:100%;border:1px solid #eee">
                                                                        <thead>
                                                                        <tr>
                                                                            <th scope="col"
                                                                                style="padding:12px;text-align:left;border:1px solid #eee">
                                                                                {{__('Product')}}
                                                                            </th>
                                                                            <th scope="col"
                                                                                style="padding:12px;text-align:left;border:1px solid #eee">
                                                                                {{__('Quantity')}}
                                                                            </th>
                                                                            <th scope="col"
                                                                                style="padding:12px;text-align:left;border:1px solid #eee">
                                                                                {{__('Price')}}
                                                                            </th>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        @foreach($data['products'] as $item)
                                                                        <tr>
                                                                            <td scope="col"
                                                                                style="padding:12px;text-align:left;border:1px solid #eee">
                                                                                <p style="color:#96588a;font-weight:normal;text-decoration:underline">
                                                                                    {{$item['name']}}</p>
                                                                            </td>
                                                                            <td scope="col" style="padding:12px;text-align:left;border:1px solid #eee">
                                                                                {{$item['pivot']['quantity']}}
                                                                            </td>
                                                                            <td scope="col" style="padding:12px;text-align:left;border:1px solid #eee">
                                                                                <span><u></u>{{get_price_html($item['pivot']['total'])}}&nbsp;<span></span><u></u></span>
                                                                            </td>
                                                                        </tr>
                                                                        @endforeach
                                                                        </tbody>
                                                                    </table>
                                                                    <table cellspacing="0" cellpadding="6" border="1"
                                                                           style="width:100%;border:1px solid #eee">
                                                                        <tbody>
                                                                        <tr>
                                                                            <th scope="row" colspan="2"
                                                                                style="padding:12px;text-align:left;border:1px solid #eee">
                                                                                {{__('Tax Subtotal')}}:
                                                                            </th>
                                                                            <td style="padding:12px;text-align:left;border:1px solid #eee">
                                                                                <span><u></u>{{$data['total_tax']}}<u></u></span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope="row" colspan="2"
                                                                                style="padding:12px;text-align:left;border:1px solid #eee">
                                                                                {{__('Total')}}:
                                                                            </th>
                                                                            <td style="padding:12px;text-align:left;border:1px solid #eee">
                                                                                <span><u></u>{{$data['total']}}<u></u></span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope="row" colspan="2"
                                                                                style="padding:12px;text-align:left;border:1px solid #eee">
                                                                                {{__('Payment Method')}}:
                                                                            </th>
                                                                            <td style="padding:12px;text-align:left;border:1px solid #eee">
                                                                                <span><u></u>{{__($data['transaction']['payment_mode'])}}<u></u></span>
                                                                            </td>
                                                                        </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <h2 style="color:#62A19B;display:block;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:18px;font-weight:bold;line-height:130%;margin:0 0 18px;text-align:left">
                                                                        {{__('Customer Details')}}</h2>
                                                                    <p style="margin:0 0 16px"><strong>{{__('Customer Name')}}: </strong>
                                                                        {{$user['username']}} </p>
                                                                    <p style="margin:0 0 16px"><strong>{{__('Email')}}: </strong>{{$user['email']}}</p>
                                                                    <p style="margin:0 0 16px"><strong>{{__('Telephone')}}: </strong>
                                                                        {{$user['phone']}}</p>
                                                                    <table id="m_8980543069595058581addresses"
                                                                           cellspacing="0" cellpadding="0" border="0"
                                                                           style="width:100%;vertical-align:top;margin-bottom:40px;padding:0">
                                                                        <tbody>
                                                                        <tr>
                                                                            <td valign="top" width="50%" style="text-align:left;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;border:0;padding:0">
                                                                                <h2 style="color:#62A19B;display:block;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:18px;font-weight:bold;line-height:130%;margin:0 0 18px;text-align:left">
                                                                                    {{__('Billing Address')}}</h2>
                                                                                <address style="padding:12px;color:#636363;border:1px solid #e5e5e5">
                                                                                    {{$data['billing_full_name']}}<br>{{$data['billing_street_address']}}<br>{{$data['billing_building']}}<br>{{$data['billing_city']}}<br>{{$data['billing_phone']}}
                                                                                </address>
                                                                            </td>
                                                                            <td valign="top" width="50%"
                                                                                style="text-align:left;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;padding:0">
                                                                                <h2 style="color:#62A19B;display:block;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:18px;font-weight:bold;line-height:130%;margin:0 0 18px;text-align:left">
                                                                                    {{__('Shipping Address')}}</h2>
                                                                                <address
                                                                                    style="padding:12px;color:#636363;border:1px solid #e5e5e5">
                                                                                    {{$data['shipping_full_name']}}<br>{{$data['shipping_street_address']}}<br>{{$data['shipping_building']}}<br>{{$data['shipping_city']}}<br>{{$data['shipping_phone']}}
                                                                                </address>
                                                                            </td>
                                                                        </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
