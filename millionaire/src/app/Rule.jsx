import React from "react";

const Rule = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 text-white bg-gray-900">
    {/* 메인으로 가는 버튼 */}
        <div className="mb-4 flex justify-center">
            <a href="/" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow">메인으로</a>
        </div>
      {/* 규칙 */}
      <h2 className="text-2xl font-bold text-green-400 border-b border-green-400 pb-2">규칙</h2>
      <ul className="mt-4 space-y-2 text-gray-300">
        <li><strong>월~금</strong></li>
        <li>- 일일 목표 최소 1개 설정</li>
        <li>- 목표를 확인(인증)할 수 있도록 구체적으로 작성</li>
        <li>- 목표 설정 당일 <strong className="text-yellow-400">03:00AM까지</strong> (Created time 기준)</li>
        <li>- 목표 완료 당일 <strong className="text-yellow-400">23:59PM까지</strong> (카톡 인증 시간 기준)</li>
        <li>- 목표를 당일에 정하는 만큼 사전 고려 X</li>
        <li>- 아플 땐 <strong className="text-blue-400">해당 날짜 보이게 인증</strong></li>
        <li>- 여행은 <strong className="text-blue-400">3일 전에 통보 후, 얼굴 보이게 셀카 인증</strong></li>
        <li>- 검사는 <strong className="text-blue-400">조부모님까지 인정</strong></li>
        <li>- 일일 목표 완료 시 <strong className="text-blue-400">웹 사이트 인증 방식 이용하기</strong></li>
        <li>- 목표 설정한 프로젝트 하다가 예상치 못한 에러로 열심히 했는데 목표 완료 못한 경우,<br/>
            <strong className="text-blue-400">개발일지로 인증 가능합니다 (아래 템플릿 참조 꼭 양식 안지켜도 되지만 자세하게 부탁드립니다.)</strong>
        </li>
      </ul>

      {/* 인증 양식 */}
      <h2 className="mt-6 text-2xl font-bold text-cyan-400 border-b border-cyan-400 pb-2">인증 양식</h2>
      <pre className="mt-4 p-4 bg-gray-800 rounded text-gray-300">
        목표 카드 인증하기 기능을 이용 <br/>
        목표 카드 클릭 → 인증하기 버튼 → 인증내용 작성 <br/> <br/>

        자세하게 적어주세요 <br/>

        1. YYYY/MM/DD <br/>

        2. 진행 사항 (Progress) <br/>
        - 진행한 작업에 대한 상세 설명. <br/>
        - 작업의 진행률을 기록합니다 (예: 50%, 완료 등).<br/>

        3. 문제점 및 해결 방법 (Challenges & Solutions) <br/>
        - 작업 중 발생한 문제점들을 기록합니다.<br/>
        - 문제 해결 과정을 설명합니다 (시도한 방법, 성공/실패 여부 등).<br/>
        - 필요한 경우 참고한 자료나 링크를 첨부합니다.<br/>

        4. 회고 (Reflection)<br/>
        - 오늘 작업에서 얻은 교훈이나 개선해야 할 점을 기록합니다.<br/>
        - 자신이 작업하면서 느낀 점이나 배운 점을 적습니다.<br/>

        5. 메모 (Notes)<br/>
        - 추가적으로 기록할 내용이 있다면 여기에 작성합니다.<br/>
        - 관련 코드 스니펫, 문서 링크, 의문점<br/>
        - 없다면 적지 않아도 괜찮습니다.<br/>
      </pre>

      {/* 벌금 */}
      <h2 className="mt-6 text-2xl font-bold text-red-400 border-b border-red-400 pb-2">벌금</h2>
      <ul className="mt-4 space-y-2 text-gray-300">
        <li>- 선 <strong className="text-red-400">30,000원 충전</strong></li>
        <li>- 일 목표 설정, 실행 실패 시 <strong className="text-red-400">개당 1,000원 차감 (2025.03은 1,000원 차감) </strong></li>
        <li>- 주 목표 설정, 실행 실패 시 <strong className="text-red-400">개당 1,500원 차감 (2025.03은 0원 차감) </strong></li>
        <li>- 월 목표 설정, 실행 실패 시 <strong className="text-red-400">개당 2,000원 차감 (2025.03은 0원 차감) </strong></li>
        <li>- 충전금액 소진 시 <strong className="text-red-400">재충전</strong></li>
        <li>- 모인 벌금은 <strong className="text-red-400">6개월에 한번 회식진행</strong></li>
        <li>- <strong className="text-red-400">중도 탈퇴 시</strong> 말일까지 남은 일 수 * 3,000원 벌금</li>
      </ul>

      {/* 진행 방식 */}
      <h2 className="mt-6 text-2xl font-bold text-purple-400 border-b border-purple-400 pb-2">진행 방식</h2>
      <p className="mt-4 text-gray-300">🔗 2025.3월부터는 <a href="https://42millionaire.phan.kr" className="text-blue-400 underline">해당 사이트에서 진행</a></p>

      {/* 명예의 전당 */}
      <h2 className="mt-6 text-2xl font-bold text-yellow-400 border-b border-yellow-400 pb-2">명예의 전당</h2>
      <p className="mt-4 text-gray-300">🏆 취업 시 <strong className="text-yellow-400">명예의 전당</strong>에 등록</p>
    </div>
  );
};

export default Rule;
