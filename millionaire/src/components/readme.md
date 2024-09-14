# 🚀 App

여기는 42 Millionaire의 component directory 입니다.

---

### 🗒️ Description

React 을 이용한 component를 만드는 디렉토리

### 🔎 How to use

컴포넌트의 이름으로 import해와서 사용한다.

### 🌱 How to contribute

- 만들고 싶은 컴포넌트의 이름으로 jsx파일을 만든다.
- 카멜케이스를 이용하여 만든다.

### 💡 Example

```tsx
// src/app/example/page.tsx
import Example from '@/containers/example';
import { getDataApi } from '@/services/example';
import { getMetadata } from '@/app/sharedMetadata';

export const metadata = getMetadata({ ... });

const ExamplePage = async () => {
  const data = await getDataApi()
    .then((res) => res.data)
    .catch(() => []);

  return <Example data={data}/>
};

export default ExamplePage;
```
