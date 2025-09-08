// 代码块复制功能
document.addEventListener('DOMContentLoaded', function() {
  // 为所有代码块添加复制按钮
  const codeBlocks = document.querySelectorAll('pre');
  
  codeBlocks.forEach(function(codeBlock) {
    // 创建包装器
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    
    // 将代码块包装起来
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);
    
    // 创建复制按钮
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', '复制代码');
    
    // 添加点击事件
    copyButton.addEventListener('click', function() {
      // 获取代码文本
      const codeText = codeBlock.textContent || codeBlock.innerText;
      
      // 复制到剪贴板
      if (navigator.clipboard && window.isSecureContext) {
        // 现代浏览器的异步API
        navigator.clipboard.writeText(codeText).then(function() {
          showCopySuccess(copyButton);
        }).catch(function(err) {
          console.error('复制失败:', err);
          fallbackCopyTextToClipboard(codeText, copyButton);
        });
      } else {
        // 降级方案
        fallbackCopyTextToClipboard(codeText, copyButton);
      }
    });
    
    // 将按钮添加到包装器
    wrapper.appendChild(copyButton);
  });
  
  // 降级复制方案
  function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // 避免滚动到底部
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showCopySuccess(button);
      } else {
        console.error('复制命令失败');
      }
    } catch (err) {
      console.error('复制失败:', err);
    }
    
    document.body.removeChild(textArea);
  }
  
  // 显示复制成功状态
  function showCopySuccess(button) {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(function() {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }
});