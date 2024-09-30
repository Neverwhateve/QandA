import React from 'react';

function ShareButton() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '问题讨论网站',
        url: window.location.href
      }).then(() => {
        console.log('分享成功');
      }).catch(console.error);
    } else {
      // 如果浏览器不支持Web Share API，可以复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('链接已复制到剪贴板');
      }).catch(console.error);
    }
  };

  return (
    <button onClick={handleShare}>分享</button>
  );
}

export default ShareButton;