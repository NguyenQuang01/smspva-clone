# Cấu trúc Routing Next.js App Router

## Tổng quan

Dự án đã được refactor từ single-page application với state management sang Next.js App Router với routing thực sự.

## Cấu trúc thư mục

```
app/
├── layout.tsx                    # Root layout
├── page.tsx                      # Home page (/) - chỉ hiển thị MainContent
├── (main)/                       # Route group cho các pages có sidebar
│   ├── layout.tsx               # Layout chung với Header + Sidebar
│   ├── page.tsx                 # Home page với sidebar
│   ├── rent-numbers/
│   │   └── page.tsx            # /rent-numbers
│   ├── hq-proxy/
│   │   └── page.tsx            # /hq-proxy
│   ├── partnership/
│   │   └── page.tsx            # /partnership
│   ├── news/
│   │   └── page.tsx            # /news
│   ├── help/
│   │   └── page.tsx            # /help
│   ├── referral-program/
│   │   └── page.tsx            # /referral-program
│   ├── country/
│   │   └── [countryName]/
│   │       └── page.tsx        # /country/united-states
│   └── service/
│       └── [serviceName]/
│           └── page.tsx        # /service/whatsapp
└── (auth)/                      # Route group cho auth pages
    ├── layout.tsx              # Layout chỉ có Header (không có sidebar)
    ├── sign-in/
    │   └── page.tsx           # /sign-in
    └── sign-up/
        └── page.tsx           # /sign-up
```

## Thay đổi chính

### 1. Tách biệt Layout

- **Main Layout**: Có Header + Sidebar cho các pages chính
- **Auth Layout**: Chỉ có Header cho sign-in/sign-up

### 2. Navigation

- Header sử dụng `usePathname()` để highlight active tab
- Sidebar sử dụng Next.js `Link` cho navigation
- Loại bỏ hoàn toàn state management cho routing

### 3. Dynamic Routes

- `/country/[countryName]` - Dynamic route cho country detail
- `/service/[serviceName]` - Dynamic route cho service detail

### 4. Components

- Header: Không còn nhận props `activeTab`, `setActiveTab`
- Sidebar: Không còn nhận props `onCountrySelect`, `onServiceSelect`
- Tất cả navigation đều sử dụng Next.js routing

## Lợi ích

1. **SEO tốt hơn**: Mỗi page có URL riêng
2. **Performance**: Code splitting tự động
3. **UX tốt hơn**: Browser back/forward hoạt động đúng
4. **Maintainability**: Code dễ maintain hơn
5. **Scalability**: Dễ thêm pages mới

## Cách sử dụng

1. Truy cập `/` - Home page với sidebar
2. Truy cập `/rent-numbers` - Rent numbers page
3. Truy cập `/sign-in` - Sign in page (không có sidebar)
4. Click vào service/country trong sidebar sẽ navigate đến dynamic routes

## Migration Notes

- Tất cả logic state management cho routing đã được loại bỏ
- Components giờ đây là pure components không có side effects
- URL structure được chuẩn hóa theo RESTful conventions
