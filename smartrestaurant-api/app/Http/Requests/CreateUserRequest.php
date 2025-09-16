<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
             'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:customers',
            'phone' => 'unique:customers',
            'password' => 'required|string|min:6',
            'birthday' => 'before_or_equal:today',
        ];
    }
    public function messages()
    {
        return [
            'birthday.before_or_equal' => 'Ngày tháng năm sinh không hợp lệ',
            'password.min' => 'Mật khấu tối thiểu 6 kí tự',
            'email.unique' => 'Email đã tồn tại.',
            'phone.unique' => 'Số điện thoại đã tồn tại',
            'name.string' => 'Tên chỉ bao gồm chữ cái'
        ];
    }
}
