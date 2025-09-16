import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t-4 border-orange-500 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Cột 1 */}
        <div>
          <h2 className="text-2xl font-bold text-orange-600">🍽 FOOD</h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Enjoy delicious food every day. Mang hương vị ẩm thực đến với bạn.
          </p>
        </div>

        {/* Cột 2 */}
        <div>
          <h3 className="text-lg font-semibold text-orange-600 mb-3">Liên kết</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="/" className="hover:text-orange-600 transition">Trang chủ</a></li>
            <li><a href="/about" className="hover:text-orange-600 transition">Giới thiệu FOOD</a></li>
            <li><a href="/thucdon" className="hover:text-orange-600 transition">Thực đơn</a></li>
            <li><a href="/discount" className="hover:text-orange-600 transition">Khuyến mãi</a></li>
            <li><a href="/service" className="hover:text-orange-600 transition">Dịch vụ</a></li>
            <li><a href="/contact" className="hover:text-orange-600 transition">Liên hệ</a></li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h3 className="text-lg font-semibold text-orange-600 mb-3">Liên hệ</h3>
          <p className="text-gray-600">📞 +84 964 834 431</p>
          <p className="text-gray-600">📧 restaurantfood@gmail.com</p>
          <p className="text-gray-600">📍 123 Đường ABC, Hà Nội</p>
        </div>

        {/* Cột 4 */}
        <div>
          <h3 className="text-lg font-semibold text-orange-600 mb-3">Theo dõi chúng tôi</h3>
          <div className="flex space-x-4 text-2xl text-gray-600">
            <a href="#" className="hover:text-orange-600 transform hover:scale-110 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-orange-600 transform hover:scale-110 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-600 transform hover:scale-110 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-orange-600 transform hover:scale-110 transition"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Dòng cuối */}
      <div className="bg-orange-500 text-white text-center py-3 text-sm">
        © 2025 FOOD. All Rights Reserved.
      </div>
    </footer>
  );
}
