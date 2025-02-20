/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 優化打包策略
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // 將 Material UI 相關模塊打包到一起
          mui: {
            test: /[\\/]node_modules[\\/](@mui|@emotion)[\\/]/,
            name: 'mui',
            chunks: 'all',
            priority: 10,
          },
          // 將其他第三方庫打包到一起
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 5,
          },
        },
      },
    };

    // 優化開發體驗
    if (dev) {
      config.devtool = 'eval-source-map';
      // 啟用快速刷新
      config.optimization.runtimeChunk = 'single';
    }

    // 優化圖片處理
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      use: [
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            optipng: {
              enabled: !dev,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75,
            },
          },
        },
      ],
    });

    return config;
  },
  // 其他 Next.js 配置
  reactStrictMode: true,
  images: {
    domains: [
      'i.pravatar.cc',  // 允許來自 pravatar.cc 的圖片
      'picsum.photos',   // 允許來自 picsum.photos 的圖片
      'localhost'
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 環境變量配置
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
}

module.exports = nextConfig; 