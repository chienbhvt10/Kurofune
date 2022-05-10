<h1><b>{{__('Hi')}}</b></h1>
<p>{{__('You are receiving this email because we received a password reset request for your account.')}}</p>
<table align="left" width="100%" cellpadding="0" cellspacing="0" role="presentation"
       style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';margin:30px auto;padding:0;text-align:center;width:100%">
    <tbody>
    <tr>
        <td align="center"
            style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                   style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                <tbody>
                <tr>
                    <td align="center"
                        style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                               style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                            <tbody>
                            <tr>
                                <td style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
                                    <a href="{{$url}}"
                                       class="m_-189440460366673236button" rel="noopener"
                                       style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';border-radius:4px;color:#fff;display:inline-block;overflow:hidden;text-decoration:none;background-color:#2d3748;border-bottom:8px solid #2d3748;border-left:18px solid #2d3748;border-right:18px solid #2d3748;border-top:8px solid #2d3748"
                                       target="_blank"
                                       data-saferedirecturl="{{$url}}">{{__('Reset Password')}}</a>
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
<p>{{__('This password reset link will expire in :expire minutes.', ['expire' => config('auth.passwords.users.expire')])}}</p>
<p>{{__('If you did not request a password reset, no further action is required.')}}</p>
<p>{{__('Regards,')}}</p>
<p>{{config('app.name')}}</p>
